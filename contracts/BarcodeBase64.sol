// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
//import "@openzeppelin/contracts/utils/Base64.sol";

library BarcodeBase64 {
    //using Base64 for bytes;
    using Strings for string;
    
    function getFontBarcode() public pure returns (string memory){
        string memory barCode  = string(abi.encodePacked(
            'AAEAAAAPAIAAAwBwR1NVQqf+uQwAAAJ8AAAARE9TLzJSivEhAAACwAAAAGBjbWFwAGYAeAAAAkAAAAA8Y3Z0IAv+BxoAAAIIAAAAOGZwZ21iLvt7AAANRAAADgxnYXNwAAAAEAAAAPwAAAAIZ2x5Zra7yTYA'
            ,'AAY8AAAHCGhlYWQY42bEAAAB0AAAADZoaGVhBBwAhQAAAUQAAAAkaG10eAPUADIAAAGcAAAANGxvY2Ee/B0oAAABaAAAADJtYXhwASUOfAAAAQQAAAAgbmFtZTGkUP4AAAPIAAACcnBvc3T/uAAyAAABJAAA'
            ,'ACBwcmVw6kjKngAAAyAAAACnAAEAAf//AA8AAQAAABgAFAAFABQABQACAB4ARQCNAAAAVg4MAAEAAQADAAAAAAAA/7UAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAJY/nAAAAH0AAAAHgHCAAEAAAAAAAAA'
            ,'AAAAAAAAAAACAAAAKgBwALYA/AFCAYgBzgIUAloCoALmAywDLAM0AzwDRANMA1QDXANkA2wDdAN8A4QAAAH0ADIB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA'
            ,'AAEBSMOhEN1fDzz1AA8D6AAAAADb/xHjAAAAANv/Ee4AAP5wAcICWAAAAAYAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AHgBaABICTgJOAk4AAAJOAk4AAAAAAk4AAAJOAk4AAAAAAAAAAgAAAAMA'
            ,'AAAUAAMAAQAAABQABAAoAAAABgAEAAEAAgAgADn//wAAACAAMP///+z/3QABAAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAA//8AAQAAAAFjYWx0AAgAAAABAAAAAQAEAAEAAAABAAgAAQAGAAsAAQAB'
            ,'AAwABAHgAZAABQAAAooCWAAAAEsCigJYAAABXgAyAPAAAAAAAAAAAAAAAACAAAADAAAAAAAAAAAAAAAAR1JDUgBAAAAgCwJY/nAAAAJYAZAAAAABAAAAAAGQAk4AAAAgAAEAS7gAyFJYsQEBjlmwAbkIAAgA'
            ,'Y3CxAAdCshkBACqxAAdCsw4IAQoqsQAHQrMWBgEKKrEACEK6A8AAAQALKrEACUK6AEAAAQALKrkAAwAARLEkAYhRWLBAiFi5AAMAZESxKAGIUVi4CACIWLkAAwAARFkbsScBiFFYugiAAAEEQIhjVFi5AAMA'
            ,'AERZWVlZWbMQBgEOKrgB/4WwBI2xAgBEswVkBgBERAAAAAAIAGYAAwABBAkAAADEAUgAAwABBAkAAQAgASgAAwABBAkAAgAOARoAAwABBAkAAwBCANgAAwABBAkABAAwAKgAAwABBAkABQBGAGIAAwABBAkA'
            ,'BgAsADYAAwABBAkADgA2AAAAaAB0AHQAcABzADoALwAvAHMAYwByAGkAcAB0AHMALgBzAGkAbAAuAG8AcgBnAC8ATwBGAEwATABpAGIAcgBlAEIAYQByAGMAbwBkAGUAMwA5AC0AUgBlAGcAdQBsAGEAcgBW'
            ,'AGUAcgBzAGkAbwBuACAAMQAuADAAMAA1ADsAIAB0AHQAZgBhAHUAdABvAGgAaQBuAHQAIAAoAHYAMQAuADgALgAzACkATABpAGIAcgBlACAAQgBhAHIAYwBvAGQAZQAgADMAOQAgAFIAZQBnAHUAbABhAHIA'
            ,'MQAuADAAMAA1ADsARwBSAEMAUgA7AEwAaQBiAHIAZQBCAGEAcgBjAG8AZABlADMAOQAtAFIAZQBnAHUAbABhAHIAUgBlAGcAdQBsAGEAcgBMAGkAYgByAGUAIABCAGEAcgBjAG8AZABlACAAMwA5AEMAbwBw'
            ,'AHkAcgBpAGcAaAB0ACAAMgAwADEANwAtADIAMAAyADAAIABUAGgAZQAgAEwAaQBiAHIAZQAgAEIAYQByAGMAbwBkAGUAIABQAHIAbwBqAGUAYwB0ACAAQQB1AHQAaABvAHIAcwAgACgAaAB0AHQAcABzADoA'
            ,'LwAvAGcAaQB0AGgAdQBiAC4AYwBvAG0ALwBnAHIAYQBwAGgAaQBjAG8AcgBlAC8AbABpAGIAcgBlAGIAYQByAGMAbwBkAGUAKQAAAAIAMv5wAcICWAADAAcAKkAnAAAAAwIAA2cAAgEBAlcAAgIBXwQBAQIB'
            ,'TwAABwYFBAADAAMRBQYXKxMRIRElIREhMgGQ/qIBLP7U/nAD6PwYMgOEAAUAAAAAAcICTgADAAcACwAPABMARUBCCAYEAgQAABBNDgkNBwwFCwMKCQEBEQFOEBAMDAgIBAQAABATEBMSEQwPDA8ODQgLCAsK'
            ,'CQQHBAcGBQADAAMRDwcXKzERMxEzETMRMxEzETMRMxEzETMRWh4eWh4eWh4eAk79sgJO/bICTv2yAk79sgJO/bIABQAAAAABwgJOAAMABwALAA8AEwBFQEIIBgQCBAAAEE0OCQ0HDAULAwoJAQERAU4QEAwM'
            ,'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'
            ,'sABLsApQWCGwDEMbS7AeUFghsB5LYbgQAGOwDENjuAUAYllZZGFZsAErWVkjsABQWGVZWSBksBZDI0JZLbAFLCBFILAEJWFkILAHQ1BYsAcjQrAII0IbISFZsAFgLbAGLCMhIyGwAysgZLEHYkIgsAgjQrAG'
            ,'RVgbsQENQ0VjsQENQ7ABYEVjsAUqISCwCEMgiiCKsAErsTAFJbAEJlFYYFAbYVJZWCNZIVkgsEBTWLABKxshsEBZI7AAUFhlWS2wByywCUMrsgACAENgQi2wCCywCSNCIyCwACNCYbACYmawAWOwAWCwByot'
            ,'sAksICBFILAOQ2O4BABiILAAUFiwQGBZZrABY2BEsAFgLbAKLLIJDgBDRUIqIbIAAQBDYEItsAsssABDI0SyAAEAQ2BCLbAMLCAgRSCwASsjsABDsAQlYCBFiiNhIGQgsCBQWCGwABuwMFBYsCAbsEBZWSOw'
            ,'AFBYZVmwAyUjYUREsAFgLbANLCAgRSCwASsjsABDsAQlYCBFiiNhIGSwJFBYsAAbsEBZI7AAUFhlWbADJSNhRESwAWAtsA4sILAAI0KzDQwAA0VQWCEbIyFZKiEtsA8ssQICRbBkYUQtsBAssAFgICCwD0NK'
            ,'sABQWCCwDyNCWbAQQ0qwAFJYILAQI0JZLbARLCCwEGJmsAFjILgEAGOKI2GwEUNgIIpgILARI0IjLbASLEtUWLEEZERZJLANZSN4LbATLEtRWEtTWLEEZERZGyFZJLATZSN4LbAULLEAEkNVWLESEkOwAWFC'
            ,'sBErWbAAQ7ACJUKxDwIlQrEQAiVCsAEWIyCwAyVQWLEBAENgsAQlQoqKIIojYbAQKiEjsAFhIIojYbAQKiEbsQEAQ2CwAiVCsAIlYbAQKiFZsA9DR7AQQ0dgsAJiILAAUFiwQGBZZrABYyCwDkNjuAQAYiCw'
            ,'AFBYsEBgWWawAWNgsQAAEyNEsAFDsAA+sgEBAUNgQi2wFSwAsQACRVRYsBIjQiBFsA4jQrANI7ABYEIgYLcYGAEAEQATAEJCQopgILAUI0KwAWGxFAgrsIsrGyJZLbAWLLEAFSstsBcssQEVKy2wGCyxAhUr'
            ,'LbAZLLEDFSstsBossQQVKy2wGyyxBRUrLbAcLLEGFSstsB0ssQcVKy2wHiyxCBUrLbAfLLEJFSstsCssIyCwEGJmsAFjsAZgS1RYIyAusAFdGyEhWS2wLCwjILAQYmawAWOwFmBLVFgjIC6wAXEbISFZLbAt'
            ,'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'
            ,'sGgsswABAEQrLbBpLLMBAABEKy2waiyzAQEARCstsGssswAAAUQrLbBsLLMAAQFEKy2wbSyzAQABRCstsG4sswEBAUQrLbBvLLEAPCsusTABFCstsHAssQA8K7BAKy2wcSyxADwrsEErLbByLLAAFrEAPCuw'
            ,'QistsHMssQE8K7BAKy2wdCyxATwrsEErLbB1LLAAFrEBPCuwQistsHYssQA9Ky6xMAEUKy2wdyyxAD0rsEArLbB4LLEAPSuwQSstsHkssQA9K7BCKy2weiyxAT0rsEArLbB7LLEBPSuwQSstsHwssQE9K7BC'
            ,'Ky2wfSyxAD4rLrEwARQrLbB+LLEAPiuwQCstsH8ssQA+K7BBKy2wgCyxAD4rsEIrLbCBLLEBPiuwQCstsIIssQE+K7BBKy2wgyyxAT4rsEIrLbCELLEAPysusTABFCstsIUssQA/K7BAKy2whiyxAD8rsEEr'
            ,'LbCHLLEAPyuwQistsIgssQE/K7BAKy2wiSyxAT8rsEErLbCKLLEBPyuwQistsIsssgsAA0VQWLAGG7IEAgNFWCMhGyFZWUIrsAhlsAMkUHixBQEVRVgwWS0='


        ));
        return barCode;
    }
}