// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./BarcodeBase64.sol";

library GenTicketURI {
    using Base64 for bytes;
    using Strings for string;
    using BarcodeBase64 for string;

    struct SVGParams {
        string descEvent;
        string descEvent2;
        string dateEvent;
        address owner;
        uint256 idToken;
    }

    function genUri(SVGParams memory params) public pure returns (string memory){
        string memory svg  = string(abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' 
                ,' viewBox="0 0 640 480" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="640" height="480"><defs><linearGradient id="e4OmChpVYcw2-stroke" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="e4OmChpVYcw2-stroke-0" offset="0%" stop-color="#3f5787"/><stop id="e4OmChpVYcw2-stroke-1" offset="100%" stop-color="#7d8698"/></linearGradient><radialGradient id="e4OmChpVYcw14-fill" cx="0" cy="0" r="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0.5 0.5)"><stop id="e4OmChpVYcw14-fill-0" offset="0%" stop-color="#a6beef"/><stop id="e4OmChpVYcw14-fill-1" offset="100%" stop-color="#3f5787"/></radialGradient><radialGradient id="e4OmChpVYcw15-fill" cx="0" cy="0" r="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0.5 0.5)"><stop id="e4OmChpVYcw15-fill-0" offset="0%" stop-color="#a6beef"/><stop id="e4OmChpVYcw15-fill-1" offset="100%" stop-color="#3f5787"/></radialGradient></defs><path d="M22.557015,67.449896L23.662751,173.84176c42.267147,0,36.886824,22.621384,36.886824,52.60793c0,'
                ,'32.786382,6.456387,65.020623-36.886824,65.020623v94.431522l588.251384-.000001v-318.451942q-589.35712-1.105729-589.35712.000004Z" transform="matrix(1.046825 0 0 0.936515-10.932618 36.772362)" fill="#fff" stroke="url(#e4OmChpVYcw2-stroke)" stroke-width="10" stroke-linejoin="round"/><path d="M628.476884,99.940203q0,1.105736-615.796256,298.235016h615.796255q.000001-299.340752.000001-298.235016Z" transform="translate(.000001 0)" fill="rgba(63,87,135,0.25)" stroke-width="1.28"/><text dx="0" dy="0" font-family="&quot;e4OmChpVYcw1:::Libre Barcode 128&quot;" font-size="40" text-decoration="underline" font-weight="400" transform="matrix(-.010121 1.664996-3.362643-.020441 534.764771 116.900228)" fill="#010412" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA[*'
                ,Strings.toString(params.idToken)
                ,'* ]]></tspan></text><text dx="0" dy="0" font-family="&quot;e4OmChpVYcw1:::Roboto&quot;" font-size="30" font-weight="700" transform="translate(29.655736 140.532839)" stroke-width="0"><tspan y="0" font-weight="700" stroke-width="0">'
                ,'<![CDATA['
                ,params.dateEvent
                ,']]></tspan></text><text dx="0" dy="0" font-family="&quot;e4OmChpVYcw1:::Roboto&quot;" font-size="20" font-weight="400"'
                ,' transform="translate(33.024347 380.411999)" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA['
                ,Strings.toHexString(uint256(uint160(params.owner)), 20)
                ,']]></tspan></text><text dx="0" dy="0" font-family="&quot;e4OmChpVYcw1:::Roboto&quot;" font-size="28" font-weight="400" transform="matrix(1 0 0 1.098734 29.865593 186.35911)" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA['
                ,params.descEvent
                ,']]></tspan></text><text dx="0" dy="0" font-family="&quot;e4OmChpVYcw1:::Roboto&quot;" font-size="20" font-weight="400" transform="matrix(1 0 0 1.098734 33.770174 346.521148)" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA['
                ,params.descEvent2
                ,']]></tspan></text><polygon points="0,-39.747624 11.681534,-16.078252 37.802237,-12.282691 18.901119,6.141346 23.363067,32.156504 0,19.873812 -23.363067,32.156504 -18.901119,6.141346 -37.802237,-12.282691 -11.681534,-16.078252 0,-39.747624" transform="matrix(.5 0 0 0.5 84.420618 251.362194)" fill="url(#e4OmChpVYcw14-fill)" stroke-width="0"/><polygon points="0,-39.747624 11.681534,-16.078252 37.802237,-12.282691 18.901119,6.141346 '
                ,'23.363067,32.156504 0,19.873812 -23.363067,32.156504 -18.901119,6.141346 -37.802237,-12.282691 -11.681534,-16.078252 0,-39.747624" transform="matrix(.5 0 0 0.5 484.622199 251.362194)" fill="url(#e4OmChpVYcw15-fill)" stroke-width="0"/><text dx="0" dy="0" font-family="&quot;e4OmChpVYcw1:::Roboto&quot;" font-size="60" font-weight="700" transform="translate(109.130615 271.578445)" stroke-width="0"><tspan y="0" font-weight="700" stroke-width="0"><![CDATA['
                ,Strings.toString(params.idToken)
                ,']]></tspan></text><text dx="0" dy="0" font-family="&quot;e4OmChpVYcw1:::Roboto&quot;" font-size="15" font-weight="400" transform="translate(300 131.743259)" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA['
                ,'https://cryptotikets.com'
                ,']]></tspan></text><style><![CDATA[@font-face {font-family: "e4OmChpVYcw1:::Libre Barcode 128";font-style: normal;font-weight: 400;src: url(https://fonts.gstatic.com/l/font?kit=cIfnMbdUsUoiW3O_hVviCwVjuLtXeJ_A5kUM-Rno3i7qt7kObPreosnCBn6z-pX46gpD85ar170Xuna3ZkzEU7JmvEx6nPmq2oL5uxuJfAG-FnmH0I0W1X9FhRE&skey=b4e8c1d4fad3a49&v=v26) format("truetype");}@font-face {font-family: "e4OmChpVYcw1:::Roboto";font-style: normal;font-weight: 400;'
                ,BarcodeBase64.getFontBarcode()
                ,' src: url(https://fonts.gstatic.com/l/font?kit=KFOmCnqEu92Fr1Me5X4NIx0QBO7CpLp9T06CNmEmWXWaGaNKYhvyymy68zpOtgRavhUYnbWzMYWcO-O482hHZlSoVqlDpb8RT8etAr-l495W&skey=a0a0114a1dcab3ac&v=v30) format("truetype");}@font-face {font-family: "e4OmChpVYcw1:::Roboto";font-style: normal;font-weight: 700;src: url(https://fonts.gstatic.com/l/font?kit=KFOlCnqEu92Fr1MmWUlvAwV_Cuvfu6d-SkmHNWwpVAzhYKdObQzV5F2_9D9CugleuhAbgKmvNYKZN1VNSAgHFDTeI8MzyNpXB7KTAryk495XfiVR&skey=c06e7213f788649e&v=v30) format("truetype");}]]></style></svg>'));
        svg = string(abi.encodePacked('data:image/svg+xml;base64,',bytes(svg).encode()));
        string memory json = (
                abi.encodePacked(
                    '{name:',Strings.toString(params.idToken)
                    ,',description:',params.descEvent
                    ,',image:'
                    ,svg
                    ,'}'
                )
            ).encode();
            return string(abi.encodePacked("data:application/json;base64,",json));
    }
}