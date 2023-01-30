import * as t from "io-ts"
import { Base64 } from "js-base64"
export * from "io-ts"
export * from "io-ts-types"

export function fromJSONString<A>(
  type: t.Decoder<unknown, A>,
  input: string
): t.Validation<A> {
  let json: unknown
  try {
    json = JSON.parse(input)
  } catch (e) {
    return t.failure(input, [], "Invalid JSON")
  }
  return type.decode(json)
}

export function optional<C extends t.Mixed>(
  c: C
): t.UnionC<[t.UndefinedC, t.NullC, C]> {
  return t.union([t.undefined, t.null, c])
}

/**
 * Type lambda returning a union of key names from input type P having type A
 */
export type FieldsWith<A, P> = {
  [K in keyof P]-?: A extends P[K] ? K : never
}[keyof P]

/**
 * Dual for FieldsWith - returns the rest of the fields
 */
export type FieldsWithout<A, P> = Exclude<keyof P, FieldsWith<A, P>>

/**
 * Typa lambda returning new type with all fields within P having type U marked as optional
 */
export type MakeOptional<P, U = undefined> = Pick<P, FieldsWithout<U, P>> &
  Partial<Pick<P, FieldsWith<U, P>>>

/**
 * Fix signature by marking all fields with undefined as optional
 */
export function fixOptionals<C extends t.Mixed>(
  c: C
): t.Type<MakeOptional<t.TypeOf<C>>, t.OutputOf<C>, t.InputOf<C>> {
  return c
}

// B64 backed Uint8Array
export const B64U8a = new t.Type<Uint8Array, string, unknown>(
  "B64U8a",
  (u): u is Uint8Array => tagOf(u) === "Uint8Array",
  (s, c) =>
    typeof s === "string"
      ? t.success(Base64.toUint8Array(s))
      : t.failure(s, c, "Expected base64 encoded string"),
  (a) => Base64.fromUint8Array(a)
)

function tagOf(u: unknown): string {
  return Object.prototype.toString.call(u).slice(8, -1)
}

// auxiliary types

export const TrimmedString = new t.Type<string, string, unknown>(
  "TrimmedString",
  (u): u is string => typeof u === "string" && u === u.trim(),
  (u, c) => {
    if (typeof u === "string") {
      return t.success(u.trim())
    }
    return t.failure(u, c)
  },
  (s) => s.trim()
)

// see: https://emailregex.com/
export const regexEmail = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

// auto converts string to a number
export const ParsedNumber = new t.Type<number, number, unknown>(
  "ParsedNumber",
  (u): u is number => !Number.isNaN(Number(u)),
  (u, c) => {
    if (typeof u === "number" && !Number.isNaN(u)) {
      return t.success(u)
    }

    if (typeof u === "string") {
      const n = Number(u)
      if (!Number.isNaN(n)) {
        return t.success(n)
      }
    }

    return t.failure(u, c)
  },
  t.identity
)