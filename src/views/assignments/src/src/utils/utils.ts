import { PATH_ROUTE, PATH_ROUTE_NAME } from 'src/routes/paths';
import { ParsedUrlQuery } from 'querystring';
import * as E from 'fp-ts/Either';

/** Your typical sleep function, for async tasks. */
export async function sleep(millis: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), millis);
  });
}

export function breadcrumbLinks(routerQuery: ParsedUrlQuery, pathname: string) {
  const links = [];

  // dashboard
  if (pathname.includes('dashboard')) {
    const { collection, batchName, batchId, taskId, tokenId, renderId } = routerQuery;
    // root home link
    links.push({ name: PATH_ROUTE_NAME.home, src: PATH_ROUTE.root });

    if (collection && batchName && batchId) {
      links.push({
        name: `${collection!.toString()} : ${batchName}`,
        src: `${PATH_ROUTE.dashboard.batchList}/?collection=${collection}&batchName=${batchName}&batchId=${batchId}`,
      });
    }

    if (batchId && collection && tokenId && batchName && taskId && renderId) {
      links.push({
        name: `TokenId : ${tokenId} - RenderId : ${renderId}`,
        src: `${PATH_ROUTE.dashboard.adminQATask}/?batchId=${batchId}&collection=${collection}&tokenId=${tokenId}&batchName=${batchName}&taskId=${taskId}&renderId=${renderId}`,
      });
    }
  } else if (pathname.includes('qatool')) {
    const { collection, batchName, taskId, tokenId, renderId } = routerQuery;
    // root home link
    links.push({ name: PATH_ROUTE_NAME.qaTool, src: PATH_ROUTE.qaTool.root });

    if (collection && tokenId && batchName && taskId && renderId) {
      links.push({
        name: `Collection: ${collection} - ${batchName} - TokenId ${tokenId} - RenderId ${renderId}`,
        src: `${PATH_ROUTE.qaTool.qaTask}/?collection=${collection}&tokenId=${tokenId}&batchName=${batchName}&taskId=${taskId}&renderId=${renderId}`,
      });
    }
  }

  return links;
}

export function hush<A, B>(e: E.Either<B, A>): A | null {
  if (E.isLeft(e)) {
    return null;
  }
  return e.right;
}
