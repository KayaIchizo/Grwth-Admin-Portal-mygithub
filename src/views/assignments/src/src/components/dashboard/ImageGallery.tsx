import { useMemo, useState } from 'react';
// @mui
import { Grid, BoxProps, styled } from '@mui/material';
// components
import Image from 'src/components/Image';
import LightboxModal from '../LightboxModal';
// types
import { RenderedAsset, RenderedAssetType } from 'src/@types/qa';
import Scrollbar from '../Scrollbar';

// ----------------------------------------------------------------------

const Img = styled(Image)(({ theme }) => ({
    border: '1px solid',
    borderRadius: 6,
    borderColor: theme.palette.common.white,
    cursor: 'pointer',
}));

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    assets: RenderedAsset[],
    frames: RenderedAsset[]
}

export default function ImageGallery({ assets, frames }: Props) {
    const imagesSrc = useMemo(
        () => {
            const assetsRendered = assets.filter(asset => asset.renderedAssetType == RenderedAssetType.PNG || asset.renderedAssetType == RenderedAssetType.WEBP).map((asset) => asset.url);
            const framesRendered = frames.map(frame => frame.url);

            return [...assetsRendered, ...framesRendered]
        }
        , [assets, frames]);

    const [openLightbox, setOpenLightbox] = useState(false);

    const [selectedImage, setSelectedImage] = useState<number>(0);

    const handleOpenLightbox = (url: string) => {
        const selectedImage = imagesSrc.findIndex((index) => index === url);
        setOpenLightbox(true);
        setSelectedImage(selectedImage);
    };

    return (
        <Scrollbar
            sx={{
                maxHeight: 'calc(100vh - 100px)',
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
            }}
        >
            <Grid container spacing={3}>
                {[...assets, ...frames].map((asset, index) =>
                    <Grid key={asset.url} item xs={12} md={6}>
                        {(asset.renderedAssetType == RenderedAssetType.PNG || asset.renderedAssetType == RenderedAssetType.WEBP) &&
                            <Img
                                alt={index.toString()}
                                src={asset.url}
                                ratio='1/1'
                                onClick={() => handleOpenLightbox(asset.url)}
                            />
                        }
                        {asset.renderedAssetType == RenderedAssetType.MP4 &&
                            <video playsInline loop autoPlay poster={imagesSrc.length > 0 ? imagesSrc[0] : ''} controls
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: '1px solid',
                                    borderRadius: 6,
                                }}>
                                <source src={asset.url} type="video/mp4" />
                            </video>
                        }
                    </Grid>
                )}
                <LightboxModal
                    images={imagesSrc}
                    mainSrc={imagesSrc[selectedImage]}
                    photoIndex={selectedImage}
                    setPhotoIndex={setSelectedImage}
                    isOpen={openLightbox}
                    onCloseRequest={() => setOpenLightbox(false)}
                />
            </Grid>
        </Scrollbar>
    );
}
