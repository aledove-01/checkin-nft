// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
//import "@uniswap/v3-core/contracts/libraries/BitMath.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

library GenTiketURI {
    using Base64 for bytes;
    using Strings for string;

    struct SVGParams {
        string descEvent;
        string dateEvent;
        address owner;
        uint256 idToken;
        string color0;
        string color1;
        string color2;
        string color3;
    }

    function genUri(SVGParams memory params) internal pure returns (string memory){
        string memory svg  = string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480"'
            ,'shape-rendering="geometricPrecision" text-rendering="geometricPrecision">'
            ,'<path d="M27.731655,80.267559v239.858351l572.260475,2.832973q.944324-242.691324,0-242.691324t-572.260475,0Z"'
            ,'transform="translate(.000002 0)" fill="none" stroke="#3f5787" stroke-width="1.28"/>'
            ,'<rect width="98.372203" height="40.174078" rx="0" ry="0" transform="matrix(5.678063 0 0 5.732321 34.775178 86.467866)"'
            ,'fill="#d2dbed" stroke-width="0"/><text dx="0" dy="0" font-family="\'Courier New\', monospace" font-size="20" font-weight="700" font-style="italic" transform="translate(45.682743 303.425)"'
            ,'stroke-width="0"><tspan y="0" font-weight="700" stroke-width="0"><![CDATA['
            ,'ORIGINAL'//string(abi.encodePacked(params.owner))
            ,']></tspan></text><text dx="0" dy="0" font-family="\'Courier New\', monospace" font-size="28" font-weight="700" transform="translate(41.969589 203.063447)"'
            ,'] fill="#007cff" stroke-width="0"><tspan y="0" font-weight="700" stroke-width="0"><![CDATA['
            ,params.descEvent
            ,']]></tspan></text><text dx="0" dy="0" font-family="\'Courier New\', monospace" font-size="24" font-weight="400" transform="translate(42.946187 117.993953)" stroke-width="0"><tspan y="0" font-weight="400" stroke-width="0"><![CDATA['
            ,params.dateEvent
            ,']]></tspan></text><text dx="0" dy="0" font-family="&\'Courier New\', monospace" font-size="30" font-weight="700" transform="translate(454.899079 121.934697)" stroke-width="0"><tspan y="0" font-weight="700" stroke-width="0"><![CDATA['
            ,Strings.toString(params.idToken)
            ,']]></tspan></text><rect id="e1tAIvods9B12" width="131.358605" height="31.526066" rx="0" ry="0" transform="translate(46.963269 240)" opacity="0.67" fill="#05f" stroke="#05f" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="10"/>'
            ,'</svg>').encode());
        svg = string(abi.encodePacked('data:image/svg+xml;base64,',bytes(svg).encode()));

        string memory json = (
                abi.encodePacked(
                    '{name:',params.idToken
                    ,',description:',params.descEvent
                    ,',image:'
                    ,svg
                    ,'}'
                )
            ).encode();

            return string(abi.encodePacked("data:application/json;base64",json));
    }

    
}