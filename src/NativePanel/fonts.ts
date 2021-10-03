const FONTS_CDN = 'https://cdn-app.sberdevices.ru/shared-static/0.0.0/fonts/SBSansText/';

export const fontFace = `
@font-face {
    font-family: 'SB Sans Text';
    src: local('SB Sans Text Medium'), local('SBSansText-Medium'), url('${FONTS_CDN}SBSansText-Medium.woff2') format('woff2'), url('${FONTS_CDN}SBSansText-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'SB Sans Text';
    src: local('SB Sans Text Regular'), local('SBSansText-Regular'), url('${FONTS_CDN}SBSansText-Regular.woff2') format('woff2'), url('${FONTS_CDN}SBSansText-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
`;

export const fontFamily500 = `
    font-family: 'SB Sans Text';
    font-weight: 500;
`;

export const fontFamily400 = `
    font-family: 'SB Sans Text';
    font-weight: 400;
`;
