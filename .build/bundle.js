(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MDKApp/i18n/i18n.properties":
/*!*******************************************************!*\
  !*** ./build.definitions/MDKApp/i18n/i18n.properties ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/AppUpdateFailure.js":
/*!************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/AppUpdateFailure.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/MDKApp/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/AppUpdateSuccess.js":
/*!************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/AppUpdateSuccess.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDKApp/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDKApp/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Customers/Customers_DeleteConfirmation.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Customers/Customers_DeleteConfirmation.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDKApp/Actions/Customers/Customers_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/MDKApp/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/OnWillUpdate.js":
/*!********************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/OnWillUpdate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/MDKApp/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDKApp/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Products/Products_DeleteConfirmation.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Products/Products_DeleteConfirmation.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDKApp/Actions/Products/Products_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/ResetAppSettingsAndLogout.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/ResetAppSettingsAndLogout.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/MDKApp/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDKApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Styles/Styles.css":
/*!****************************************************!*\
  !*** ./build.definitions/MDKApp/Styles/Styles.css ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDKApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKApp/Styles/Styles.less":
/*!*****************************************************!*\
  !*** ./build.definitions/MDKApp/Styles/Styles.less ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDKApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKApp/Styles/Styles.nss":
/*!****************************************************!*\
  !*** ./build.definitions/MDKApp/Styles/Styles.nss ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/api.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/api.js ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!**************************************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2302.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \**************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Custom/Custom_Customer_Detail.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Custom/Custom_Customer_Detail.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"{FirstName}","Footnote":"{EmailAddress}","Description":"{CustomerId}","StatusText":"{PhoneNumber}","DetailImage":"sap-icon://customer","DetailImageIsCircular":false,"BodyText":"{DateOfBirth}","HeadlineText":"{LastName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"KeyAndValues":[{"Value":"{Address/HouseNumber} {Address/Street}","_Name":"KeyValue0","KeyName":"Address","Visible":true},{"Value":"{Address/City}","_Name":"KeyValue3","KeyName":"City","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}},{"KeyAndValues":[{"Value":"{Address/PostalCode}","_Name":"KeyValue1","KeyName":"Post Code","Visible":true},{"Value":"{Address/Country}","_Name":"KeyValue2","KeyName":"Country","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"Custom_Customer_Detail","Caption":"Customer Detail","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ABIUpdateInit","Caption":"Update Record","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MDKApp/Actions/Custom/NavToCustom_Customers_Edit.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Custom/Custom_Customer_List.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Custom/Custom_Customer_List.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","Target":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":"$orderby=LastName"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"ContactCell":{"ContextMenu":{"PerformFirstActionWithFullSwipe":true,"Items":[]},"DetailImage":"","Headline":"{LastName}","Subheadline":"{FirstName}","Description":"{City}","OnPress":"/MDKApp/Actions/Custom/NavTo_Custom_Customer_Detail.action","ActivityItems":[{"_Name":"SectionContactCell0ActivityItems0","ActivityType":"Phone","ActivityValue":"{PhoneNumber}"},{"_Name":"SectionContactCell0ActivityItems1","ActivityType":"Email","ActivityValue":"{EmailAddress}"}]},"Search":{"Enabled":true,"BarcodeScanner":true}}]}],"_Type":"Page","_Name":"Custom_Customer_List","Caption":"Customer","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Custom/Custom_Customers_Edit.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Custom/Custom_Customers_Edit.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer0","Sections":[{"Controls":[{"Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFirstName","IsEditable":true,"IsVisible":true,"Caption":"First Name","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCLastName","IsEditable":true,"IsVisible":true,"Caption":"Last Name","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCPhone","IsEditable":true,"IsVisible":true,"Caption":"Phone","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCEmail","IsEditable":true,"IsVisible":true,"Caption":"Email","PlaceHolder":"PlaceHolder","Enabled":true}],"Visible":true}]}],"_Type":"Page","_Name":"Custom_Customers_Edit","Caption":"Update Customer","ActionBar":{"Items":[{"_Name":"ABICancel","Caption":"Cancel","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/MDKApp/Actions/Custom/CloseModalPage_Cancel.action"},{"_Name":"ABIUpdate","Caption":"Update","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MDKApp/Actions/Custom/Custom_Customer_UpdateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Customers/Customers_Create.page":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Customers/Customers_Create.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/Customers/Customers_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Customer Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"City","_Name":"City","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","_Name":"CustomerId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"DateOfBirth","Caption":"DateOfBirth","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"EmailAddress","_Name":"EmailAddress","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"FirstName","_Name":"FirstName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LastName","_Name":"LastName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Customers_Create"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Customers/Customers_CreateSalesOrderHeader.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Customers/Customers_CreateSalesOrderHeader.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/Customers/Customers_CreateSalesOrderHeader.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderHeader","Controls":[{"Sections":[{"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerId}","ReturnValue":"{CustomerId}","Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"CustomerId","_Type":"Control.Type.FormCell.ListPicker","Value":"{CustomerId}"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","_Name":"SalesOrderId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Customers_CreateSalesOrderHeader"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Customers/Customers_Detail.page":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Customers/Customers_Detail.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customer Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/Customers/NavToCustomers_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Actions/Customers/Customers_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FirstName}","Subhead":"{City}","BodyText":"","Footnote":"{CustomerId}","Description":"{Country}","StatusText":"{DateOfBirth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{EmailAddress}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"DateOfBirth","Value":"{DateOfBirth}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"SalesOrders"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}","OnPress":"/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrders","Service":"/MDKApp/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Customers/Customers_Edit.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Customers/Customers_Edit.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Customer Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/Customers/Customers_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"City","_Name":"City","Value":"{City}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","Value":"{Country}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","_Name":"CustomerId","Value":"{CustomerId}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Mode":"Datetime","_Name":"DateOfBirth","Value":"{DateOfBirth}","Caption":"DateOfBirth","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"EmailAddress","_Name":"EmailAddress","Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"FirstName","_Name":"FirstName","Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","Value":"{HouseNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LastName","_Name":"LastName","Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","Value":"{PostalCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","Value":"{Street}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Value":"{UpdatedTimestamp}","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Customers_Edit"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Customers/Customers_List.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Customers/Customers_List.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customers","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/Customers/NavToCustomers_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/Customers/NavToCustomers_Detail.action","StatusImage":"","Title":"{FirstName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{DateOfBirth}","Subhead":"{City}","SubstatusText":"{EmailAddress}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Main.page":
/*!**************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Main.page ***!
  \**************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Customers","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","OnPress":"/MDKApp/Actions/Customers/NavToCustomers_List.action"},{"_Name":"Custom Customer List","Title":"Custom Customer List","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://customer","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MDKApp/Actions/Custom/NavToCustomCustomers_List.action"},{"_Name":"SectionButton1","Title":"Products","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","OnPress":"/MDKApp/Actions/Products/NavToProducts_List.action"},{"_Name":"SectionButton2","Title":"PurchaseOrderHeaders","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action"},{"_Name":"SectionButton3","Title":"PurchaseOrderItems","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","OnPress":"/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action"},{"_Name":"SectionButton4","Title":"SalesOrderHeaders","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","OnPress":"/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action"},{"_Name":"SectionButton5","Title":"SalesOrderItems","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","OnPress":"/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_List.action"}]},{"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable1","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MDKApp/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDKApp/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MDKApp/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Products/Products_Create.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Products/Products_Create.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/Products/Products_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Product Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"Category","_Name":"Category","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","KeyboardType":"Number","_Name":"DimensionDepth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","KeyboardType":"Number","_Name":"DimensionHeight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","KeyboardType":"Number","_Name":"DimensionWidth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","KeyboardType":"Number","_Name":"Price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ProductId}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Stock","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Weight","KeyboardType":"Number","_Name":"Weight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"AttachmentTitle":"Media","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":["jpg","png","gif"],"_Name":"Attachment","_Type":"Control.Type.FormCell.Attachment"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Products_Create"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Products/Products_Detail.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Products/Products_Detail.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Product Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/Products/NavToProducts_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Actions/Products/Products_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/MDKApp/Services/SampleServiceV2.service/{@odata.readLink}/$value","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Products/Products_Edit.page":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Products/Products_Edit.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Product Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/Products/Products_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"Category","_Name":"Category","Value":"{Category}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","Value":"{CategoryName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","_Name":"DimensionDepth","Value":"{DimensionDepth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","_Name":"DimensionHeight","Value":"{DimensionHeight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","Value":"{DimensionUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","_Name":"DimensionWidth","Value":"{DimensionWidth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","Value":"{LongDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","Value":"{PictureUrl}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","_Name":"Price","Value":"{Price}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ProductId}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Stock","Service":"/MDKApp/Services/SampleServiceV2.service"}},"Value":"{ProductId}","_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","Value":"{ShortDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDKApp/Services/SampleServiceV2.service"}},"Value":"{SupplierId}","_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Value":"{UpdatedTimestamp}","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Weight","_Name":"Weight","Value":"{Weight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","Value":"{WeightUnit}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Products_Edit"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Products/Products_List.page":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Products/Products_List.page ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Products","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/Products/NavToProducts_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/MDKApp/Services/SampleServiceV2.service/{@odata.readLink}/$value"}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/Products/NavToProducts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create PurchaseOrderHeader Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PurchaseOrderId","_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Create"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create PurchaseOrderItem","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderId}","ReturnValue":"{PurchaseOrderId}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.ListPicker","Value":"{PurchaseOrderId}"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_CreatePurchaseOrderItem"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeader Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{PurchaseOrderId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{NetAmount}","Description":"{GrossAmount}","StatusText":"{SupplierId}","StatusImage":"","SubstatusImage":"","SubstatusText":"{TaxAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}","OnPress":"/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDKApp/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update PurchaseOrderHeader Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PurchaseOrderId","_Name":"PurchaseOrderId","Value":"{PurchaseOrderId}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDKApp/Services/SampleServiceV2.service"}},"Value":"{SupplierId}","_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Edit"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeaders","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action","StatusImage":"","Title":"{PurchaseOrderId}","Footnote":"{NetAmount}","PreserveIconStackSpacing":false,"StatusText":"{SupplierId}","Subhead":"{CurrencyCode}","SubstatusText":"{TaxAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create PurchaseOrderItem Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderId}","ReturnValue":"{PurchaseOrderId}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderItems_Create"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{ItemNumber}","Description":"{GrossAmount}","StatusText":"{NetAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PurchaseOrderId}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","_Name":"ItemNumber","Value":"{ItemNumber}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service"}},"Value":"{ProductId}","_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderId}","ReturnValue":"{PurchaseOrderId}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"}},"Value":"{PurchaseOrderId}","_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"Quantity","_Name":"Quantity","Value":"{Quantity}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderItems_Edit"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItems","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Create.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Create.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderHeader Detail","Controls":[{"Sections":[{"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerId}","ReturnValue":"{CustomerId}","Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"CustomerId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","_Name":"SalesOrderId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"SalesOrderHeaders_Create"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderItem","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"DeliveryDate","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderId}","ReturnValue":"{SalesOrderId}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"SalesOrderId","_Type":"Control.Type.FormCell.ListPicker","Value":"{SalesOrderId}"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"SalesOrderHeaders_CreateSalesOrderItem"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","BodyText":"","Footnote":"{CustomerId}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{LifeCycleStatus}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CreatedAt","Value":"{CreatedAt}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"LifeCycleStatus","Value":"{LifeCycleStatus}"},{"KeyName":"LifeCycleStatusName","Value":"{LifeCycleStatusName}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDKApp/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Value":"{CreatedAt}","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerId}","ReturnValue":"{CustomerId}","Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/SampleServiceV2.service"}},"Value":"{CustomerId}","_Name":"CustomerId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","Value":"{LifeCycleStatus}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","Value":"{LifeCycleStatusName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","_Name":"SalesOrderId","Value":"{SalesOrderId}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"SalesOrderHeaders_Edit"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeaders","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action","StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Create.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Create.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/SalesOrderItems/SalesOrderItems_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SalesOrderItem Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"DeliveryDate","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderId}","ReturnValue":"{SalesOrderId}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"}},"_Name":"SalesOrderId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"SalesOrderItems_Create"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItem Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{GrossAmount}","Description":"{DeliveryDate}","StatusText":"{ItemNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{NetAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DeliveryDate","Value":"{DeliveryDate}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update SalesOrderItem Detail","DesignTimeTarget":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"DeliveryDate","Value":"{DeliveryDate}","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","_Name":"ItemNumber","Value":"{ItemNumber}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service"}},"Value":"{ProductId}","_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","_Name":"Quantity","Value":"{Quantity}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderId}","ReturnValue":"{SalesOrderId}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"}},"Value":"{SalesOrderId}","_Name":"SalesOrderId","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"SalesOrderItems_Edit"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_List.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_List.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Header":{"_Name":"SectionHeader0","UseTopPadding":false},"_Type":"Section.Type.ObjectTable","Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service","QueryOptions":""},"_Name":"SectionObjectTable0","EmptySection":{"Caption":"No record found!","FooterVisible":false},"ObjectCell":{"Title":"{ProductId}","Subhead":"{CurrencyCode}","Footnote":"{GrossAmount}","Description":"{DeliveryDate}","StatusText":"{ItemNumber}","SubstatusText":"{NetAmount}","PreserveIconStackSpacing":false,"AccessoryType":"disclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"OnPress":"/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action","ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true}},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."}}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."}}],"_Type":"Page","_Name":"SalesOrderItems_List","Caption":"SalesOrderItems","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Add","Position":"Right","IsIconCircular":false,"OnPress":"/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDKApp","Version":"/MDKApp/Globals/AppDefinition_Version.global","MainPage":"/MDKApp/Pages/Main.page","OnLaunch":["/MDKApp/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDKApp/Rules/OnWillUpdate.js","OnDidUpdate":"/MDKApp/Actions/Service/InitializeOffline.action","Styles":"/MDKApp/Styles/Styles.less","Localization":"/MDKApp/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/MDKApp/Styles/Styles.css","ios":"/MDKApp/Styles/Styles.nss","android":"/MDKApp/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/AppUpdate.action":
/*!***********************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/AppUpdate.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDKApp/Rules/AppUpdateFailure.js","OnSuccess":"/MDKApp/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/AppUpdateFailureMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/AppUpdateFailureMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/AppUpdateProgressBanner.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/AppUpdateProgressBanner.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDKApp/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/AppUpdateSuccessMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/AppUpdateSuccessMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/CloseModalPage_Cancel.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/CloseModalPage_Cancel.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/CloseModalPage_Complete.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/CloseModalPage_Complete.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/ClosePage.action":
/*!***********************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/ClosePage.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/CreateEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/CreateEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/CreateEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/CreateEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MDKApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Custom/CloseModalPage_Cancel.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Custom/CloseModalPage_Cancel.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Custom/CloseModalPage_Complete.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Custom/CloseModalPage_Complete.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Complete"},"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Custom/Custom_Customer_UpdateEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Custom/Custom_Customer_UpdateEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"Custom_Customer_UpdateEntity"},"OnFailure":"/MDKApp/Actions/Custom/UpdateCustomerEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/Custom/CloseModalPage_Complete.action","Target":{"Service":"/MDKApp/Services/SampleServiceV2.service","EntitySet":"Customers","ReadLink":"{@odata.readLink}"},"Properties":{"EmailAddress":"#Control:FCEmail/#Value","FirstName":"#Control:FCFirstName/#Value","LastName":"#Control:FCLastName/#Value","PhoneNumber":"#Control:FCPhone/#Value"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Custom/NavToCustomCustomers_List.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Custom/NavToCustomCustomers_List.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomCustomers_List"},"PageToOpen":"/MDKApp/Pages/Custom/Custom_Customer_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Custom/NavToCustom_Customers_Edit.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Custom/NavToCustom_Customers_Edit.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustom_Customers_Edit"},"PageToOpen":"/MDKApp/Pages/Custom/Custom_Customers_Edit.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Custom/NavTo_Custom_Customer_Detail.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Custom/NavTo_Custom_Customer_Detail.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavTo_Custom_Customer_Detail"},"PageToOpen":"/MDKApp/Pages/Custom/Custom_Customer_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Custom/UpdateCustomerEntityFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Custom/UpdateCustomerEntityFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateCustomerEntityFailureMessage"},"Message":"Failed to Save Customer Updates - {#ActionResults:update/error}","Title":"Update Customer","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/Customers_CreateEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/Customers_CreateEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","CustomerId":"#Control:CustomerId/#Value","DateOfBirth":"#Control:DateOfBirth/#Value","EmailAddress":"#Control:EmailAddress/#Value","FirstName":"#Control:FirstName/#Value","HouseNumber":"#Control:HouseNumber/#Value","LastName":"#Control:LastName/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value"},"Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/Customers_CreateSalesOrderHeader.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/Customers_CreateSalesOrderHeader.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"SalesOrders","Target":{"EntitySet":"Customers","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerId":"#Control:CustomerId/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderId":"#Control:SalesOrderId/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/Customers_DeleteEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/Customers_DeleteEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/Customers_DetailPopover.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/Customers_DetailPopover.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add SalesOrderHeader","OnPress":"/MDKApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action"},{"Title":"Delete","OnPress":"/MDKApp/Rules/Customers/Customers_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/Customers_UpdateEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/Customers_UpdateEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","CustomerId":"#Control:CustomerId/#Value","DateOfBirth":"#Control:DateOfBirth/#Value","EmailAddress":"#Control:EmailAddress/#Value","FirstName":"#Control:FirstName/#Value","HouseNumber":"#Control:HouseNumber/#Value","LastName":"#Control:LastName/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Create.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Create.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/Customers/Customers_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/Customers/Customers_CreateSalesOrderHeader.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Detail.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Detail.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/Customers/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Edit.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Edit.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/Customers/Customers_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_List.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Customers/NavToCustomers_List.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/Customers/Customers_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/DeleteConfirmation.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/DeleteConfirmation.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/DeleteEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/DeleteEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/DeleteEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/DeleteEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDKApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Logout.action":
/*!********************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Logout.action ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/LogoutMessage.action":
/*!***************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/LogoutMessage.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDKApp/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/OnWillUpdate.action":
/*!**************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/OnWillUpdate.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/NavToProducts_Create.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/NavToProducts_Create.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/Products/Products_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/NavToProducts_Detail.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/NavToProducts_Detail.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/NavToProducts_Edit.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/NavToProducts_Edit.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/Products/Products_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/NavToProducts_List.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/NavToProducts_List.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/Products/Products_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/Products_CreateEntity.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/Products_CreateEntity.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductId":"#Control:ProductId/#SelectedValue","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"Media":"#Control:Attachment/#Value","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateMedia"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/Products_DeleteEntity.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/Products_DeleteEntity.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/Products_DetailPopover.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/Products_DetailPopover.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/MDKApp/Actions/Products/Products_OpenDocument.action"},{"Title":"Delete","OnPress":"/MDKApp/Rules/Products/Products_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/Products_OpenDocument.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/Products_OpenDocument.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/MDKApp/Services/SampleServiceV2.service/{@odata.readLink}/$value","MimeType":"image/jpeg"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Products/Products_UpdateEntity.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Products/Products_UpdateEntity.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductId":"#Control:ProductId/#SelectedValue","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action":
/*!************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action ***!
  \************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","NetAmount":"#Control:NetAmount/#Value","PurchaseOrderId":"#Control:PurchaseOrderId/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"Items","Target":{"EntitySet":"PurchaseOrderHeaders","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","PurchaseOrderId":"#Control:PurchaseOrderId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add PurchaseOrderItem","OnPress":"/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action"},{"Title":"Delete","OnPress":"/MDKApp/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","NetAmount":"#Control:NetAmount/#Value","PurchaseOrderId":"#Control:PurchaseOrderId/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","PurchaseOrderId":"#Control:PurchaseOrderId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","PurchaseOrderId":"#Control:PurchaseOrderId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerId":"#Control:CustomerId/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderId":"#Control:SalesOrderId/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"Items","Target":{"EntitySet":"SalesOrderHeaders","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderId":"#Control:SalesOrderId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add SalesOrderItem","OnPress":"/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action"},{"Title":"Delete","OnPress":"/MDKApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerId":"#Control:CustomerId/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderId":"#Control:SalesOrderId/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Create.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Create.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_List.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_List.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/SalesOrderItems/SalesOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_CreateEntity.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_CreateEntity.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderId":"#Control:SalesOrderId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderId":"#Control:SalesOrderId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/CloseOffline.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/CloseOffline.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDKApp/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDKApp/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDKApp/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/CloseOfflineFailureMessage.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/CloseOfflineFailureMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/CloseOfflineSuccessMessage.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/DownloadOffline.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/DownloadOffline.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDKApp/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/DownloadStartedMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/DownloadStartedMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDKApp/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/InitializeOffline.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/InitializeOffline.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDKApp/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDKApp/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/InitializeOfflineFailureMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/SyncFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/SyncFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/SyncStartedMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/SyncStartedMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDKApp/Actions/Service/UploadOffline.action","OnFailure":"/MDKApp/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/SyncSuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/SyncSuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Service/UploadOffline.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Service/UploadOffline.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDKApp/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDKApp/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/UpdateEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/UpdateEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/UpdateEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/UpdateEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDKApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Globals/AppDefinition_Version.global":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKApp/Globals/AppDefinition_Version.global ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKApp/Services/SampleServiceV2.service":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKApp/Services/SampleServiceV2.service ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/MDKApp/Styles/Styles.json":
/*!*****************************************************!*\
  !*** ./build.definitions/MDKApp/Styles/Styles.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDKApp/jsconfig.json":
/*!************************************************!*\
  !*** ./build.definitions/MDKApp/jsconfig.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mdkapp_actions_appupdate_action = __webpack_require__(/*! ./MDKApp/Actions/AppUpdate.action */ "./build.definitions/MDKApp/Actions/AppUpdate.action")
let mdkapp_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDKApp/Actions/AppUpdateFailureMessage.action")
let mdkapp_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDKApp/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDKApp/Actions/AppUpdateProgressBanner.action")
let mdkapp_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDKApp/Actions/AppUpdateSuccessMessage.action")
let mdkapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDKApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDKApp/Actions/CloseModalPage_Cancel.action")
let mdkapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDKApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDKApp/Actions/CloseModalPage_Complete.action")
let mdkapp_actions_closepage_action = __webpack_require__(/*! ./MDKApp/Actions/ClosePage.action */ "./build.definitions/MDKApp/Actions/ClosePage.action")
let mdkapp_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MDKApp/Actions/CreateEntityFailureMessage.action")
let mdkapp_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MDKApp/Actions/CreateEntitySuccessMessage.action")
let mdkapp_actions_custom_closemodalpage_cancel_action = __webpack_require__(/*! ./MDKApp/Actions/Custom/CloseModalPage_Cancel.action */ "./build.definitions/MDKApp/Actions/Custom/CloseModalPage_Cancel.action")
let mdkapp_actions_custom_closemodalpage_complete_action = __webpack_require__(/*! ./MDKApp/Actions/Custom/CloseModalPage_Complete.action */ "./build.definitions/MDKApp/Actions/Custom/CloseModalPage_Complete.action")
let mdkapp_actions_custom_custom_customer_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/Custom/Custom_Customer_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/Custom/Custom_Customer_UpdateEntity.action")
let mdkapp_actions_custom_navto_custom_customer_detail_action = __webpack_require__(/*! ./MDKApp/Actions/Custom/NavTo_Custom_Customer_Detail.action */ "./build.definitions/MDKApp/Actions/Custom/NavTo_Custom_Customer_Detail.action")
let mdkapp_actions_custom_navtocustom_customers_edit_action = __webpack_require__(/*! ./MDKApp/Actions/Custom/NavToCustom_Customers_Edit.action */ "./build.definitions/MDKApp/Actions/Custom/NavToCustom_Customers_Edit.action")
let mdkapp_actions_custom_navtocustomcustomers_list_action = __webpack_require__(/*! ./MDKApp/Actions/Custom/NavToCustomCustomers_List.action */ "./build.definitions/MDKApp/Actions/Custom/NavToCustomCustomers_List.action")
let mdkapp_actions_custom_updatecustomerentityfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/Custom/UpdateCustomerEntityFailureMessage.action */ "./build.definitions/MDKApp/Actions/Custom/UpdateCustomerEntityFailureMessage.action")
let mdkapp_actions_customers_customers_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/Customers_CreateEntity.action */ "./build.definitions/MDKApp/Actions/Customers/Customers_CreateEntity.action")
let mdkapp_actions_customers_customers_createsalesorderheader_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/Customers_CreateSalesOrderHeader.action */ "./build.definitions/MDKApp/Actions/Customers/Customers_CreateSalesOrderHeader.action")
let mdkapp_actions_customers_customers_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/Customers_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/Customers/Customers_DeleteEntity.action")
let mdkapp_actions_customers_customers_detailpopover_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/Customers_DetailPopover.action */ "./build.definitions/MDKApp/Actions/Customers/Customers_DetailPopover.action")
let mdkapp_actions_customers_customers_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/Customers_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/Customers/Customers_UpdateEntity.action")
let mdkapp_actions_customers_navtocustomers_create_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/NavToCustomers_Create.action */ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Create.action")
let mdkapp_actions_customers_navtocustomers_createsalesorderheader_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action */ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_CreateSalesOrderHeader.action")
let mdkapp_actions_customers_navtocustomers_detail_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/NavToCustomers_Detail.action */ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Detail.action")
let mdkapp_actions_customers_navtocustomers_edit_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/NavToCustomers_Edit.action */ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_Edit.action")
let mdkapp_actions_customers_navtocustomers_list_action = __webpack_require__(/*! ./MDKApp/Actions/Customers/NavToCustomers_List.action */ "./build.definitions/MDKApp/Actions/Customers/NavToCustomers_List.action")
let mdkapp_actions_deleteconfirmation_action = __webpack_require__(/*! ./MDKApp/Actions/DeleteConfirmation.action */ "./build.definitions/MDKApp/Actions/DeleteConfirmation.action")
let mdkapp_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MDKApp/Actions/DeleteEntityFailureMessage.action")
let mdkapp_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MDKApp/Actions/DeleteEntitySuccessMessage.action")
let mdkapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let mdkapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let mdkapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let mdkapp_actions_logout_action = __webpack_require__(/*! ./MDKApp/Actions/Logout.action */ "./build.definitions/MDKApp/Actions/Logout.action")
let mdkapp_actions_logoutmessage_action = __webpack_require__(/*! ./MDKApp/Actions/LogoutMessage.action */ "./build.definitions/MDKApp/Actions/LogoutMessage.action")
let mdkapp_actions_onwillupdate_action = __webpack_require__(/*! ./MDKApp/Actions/OnWillUpdate.action */ "./build.definitions/MDKApp/Actions/OnWillUpdate.action")
let mdkapp_actions_products_navtoproducts_create_action = __webpack_require__(/*! ./MDKApp/Actions/Products/NavToProducts_Create.action */ "./build.definitions/MDKApp/Actions/Products/NavToProducts_Create.action")
let mdkapp_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./MDKApp/Actions/Products/NavToProducts_Detail.action */ "./build.definitions/MDKApp/Actions/Products/NavToProducts_Detail.action")
let mdkapp_actions_products_navtoproducts_edit_action = __webpack_require__(/*! ./MDKApp/Actions/Products/NavToProducts_Edit.action */ "./build.definitions/MDKApp/Actions/Products/NavToProducts_Edit.action")
let mdkapp_actions_products_navtoproducts_list_action = __webpack_require__(/*! ./MDKApp/Actions/Products/NavToProducts_List.action */ "./build.definitions/MDKApp/Actions/Products/NavToProducts_List.action")
let mdkapp_actions_products_products_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/Products/Products_CreateEntity.action */ "./build.definitions/MDKApp/Actions/Products/Products_CreateEntity.action")
let mdkapp_actions_products_products_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/Products/Products_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/Products/Products_DeleteEntity.action")
let mdkapp_actions_products_products_detailpopover_action = __webpack_require__(/*! ./MDKApp/Actions/Products/Products_DetailPopover.action */ "./build.definitions/MDKApp/Actions/Products/Products_DetailPopover.action")
let mdkapp_actions_products_products_opendocument_action = __webpack_require__(/*! ./MDKApp/Actions/Products/Products_OpenDocument.action */ "./build.definitions/MDKApp/Actions/Products/Products_OpenDocument.action")
let mdkapp_actions_products_products_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/Products/Products_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/Products/Products_UpdateEntity.action")
let mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_create_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action")
let mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action")
let mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action")
let mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_edit_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action")
let mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action")
let mdkapp_actions_purchaseorderheaders_purchaseorderheaders_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action")
let mdkapp_actions_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action")
let mdkapp_actions_purchaseorderheaders_purchaseorderheaders_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action")
let mdkapp_actions_purchaseorderheaders_purchaseorderheaders_detailpopover_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action")
let mdkapp_actions_purchaseorderheaders_purchaseorderheaders_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action")
let mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_create_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action")
let mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action")
let mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_edit_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action")
let mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_list_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action")
let mdkapp_actions_purchaseorderitems_purchaseorderitems_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action")
let mdkapp_actions_purchaseorderitems_purchaseorderitems_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action")
let mdkapp_actions_purchaseorderitems_purchaseorderitems_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action")
let mdkapp_actions_salesorderheaders_navtosalesorderheaders_create_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action")
let mdkapp_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action")
let mdkapp_actions_salesorderheaders_navtosalesorderheaders_detail_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action")
let mdkapp_actions_salesorderheaders_navtosalesorderheaders_edit_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action")
let mdkapp_actions_salesorderheaders_navtosalesorderheaders_list_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action")
let mdkapp_actions_salesorderheaders_salesorderheaders_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action")
let mdkapp_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action")
let mdkapp_actions_salesorderheaders_salesorderheaders_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action")
let mdkapp_actions_salesorderheaders_salesorderheaders_detailpopover_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action")
let mdkapp_actions_salesorderheaders_salesorderheaders_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action")
let mdkapp_actions_salesorderitems_navtosalesorderitems_create_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Create.action */ "./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Create.action")
let mdkapp_actions_salesorderitems_navtosalesorderitems_detail_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action */ "./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action")
let mdkapp_actions_salesorderitems_navtosalesorderitems_edit_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action */ "./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_Edit.action")
let mdkapp_actions_salesorderitems_navtosalesorderitems_list_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_List.action */ "./build.definitions/MDKApp/Actions/SalesOrderItems/NavToSalesOrderItems_List.action")
let mdkapp_actions_salesorderitems_salesorderitems_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderItems/SalesOrderItems_CreateEntity.action */ "./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_CreateEntity.action")
let mdkapp_actions_salesorderitems_salesorderitems_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_DeleteEntity.action")
let mdkapp_actions_salesorderitems_salesorderitems_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/SalesOrderItems/SalesOrderItems_UpdateEntity.action")
let mdkapp_actions_service_closeoffline_action = __webpack_require__(/*! ./MDKApp/Actions/Service/CloseOffline.action */ "./build.definitions/MDKApp/Actions/Service/CloseOffline.action")
let mdkapp_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/MDKApp/Actions/Service/CloseOfflineFailureMessage.action")
let mdkapp_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/MDKApp/Actions/Service/CloseOfflineSuccessMessage.action")
let mdkapp_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDKApp/Actions/Service/DownloadOffline.action */ "./build.definitions/MDKApp/Actions/Service/DownloadOffline.action")
let mdkapp_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDKApp/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/MDKApp/Actions/Service/DownloadStartedMessage.action")
let mdkapp_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDKApp/Actions/Service/InitializeOffline.action */ "./build.definitions/MDKApp/Actions/Service/InitializeOffline.action")
let mdkapp_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/MDKApp/Actions/Service/InitializeOfflineFailureMessage.action")
let mdkapp_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/MDKApp/Actions/Service/InitializeOfflineSuccessMessage.action")
let mdkapp_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/Service/SyncFailureMessage.action */ "./build.definitions/MDKApp/Actions/Service/SyncFailureMessage.action")
let mdkapp_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDKApp/Actions/Service/SyncStartedMessage.action */ "./build.definitions/MDKApp/Actions/Service/SyncStartedMessage.action")
let mdkapp_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/MDKApp/Actions/Service/SyncSuccessMessage.action")
let mdkapp_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDKApp/Actions/Service/UploadOffline.action */ "./build.definitions/MDKApp/Actions/Service/UploadOffline.action")
let mdkapp_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MDKApp/Actions/UpdateEntityFailureMessage.action")
let mdkapp_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MDKApp/Actions/UpdateEntitySuccessMessage.action")
let mdkapp_globals_appdefinition_version_global = __webpack_require__(/*! ./MDKApp/Globals/AppDefinition_Version.global */ "./build.definitions/MDKApp/Globals/AppDefinition_Version.global")
let mdkapp_i18n_i18n_properties = __webpack_require__(/*! ./MDKApp/i18n/i18n.properties */ "./build.definitions/MDKApp/i18n/i18n.properties")
let mdkapp_jsconfig_json = __webpack_require__(/*! ./MDKApp/jsconfig.json */ "./build.definitions/MDKApp/jsconfig.json")
let mdkapp_pages_custom_custom_customer_detail_page = __webpack_require__(/*! ./MDKApp/Pages/Custom/Custom_Customer_Detail.page */ "./build.definitions/MDKApp/Pages/Custom/Custom_Customer_Detail.page")
let mdkapp_pages_custom_custom_customer_list_page = __webpack_require__(/*! ./MDKApp/Pages/Custom/Custom_Customer_List.page */ "./build.definitions/MDKApp/Pages/Custom/Custom_Customer_List.page")
let mdkapp_pages_custom_custom_customers_edit_page = __webpack_require__(/*! ./MDKApp/Pages/Custom/Custom_Customers_Edit.page */ "./build.definitions/MDKApp/Pages/Custom/Custom_Customers_Edit.page")
let mdkapp_pages_customers_customers_create_page = __webpack_require__(/*! ./MDKApp/Pages/Customers/Customers_Create.page */ "./build.definitions/MDKApp/Pages/Customers/Customers_Create.page")
let mdkapp_pages_customers_customers_createsalesorderheader_page = __webpack_require__(/*! ./MDKApp/Pages/Customers/Customers_CreateSalesOrderHeader.page */ "./build.definitions/MDKApp/Pages/Customers/Customers_CreateSalesOrderHeader.page")
let mdkapp_pages_customers_customers_detail_page = __webpack_require__(/*! ./MDKApp/Pages/Customers/Customers_Detail.page */ "./build.definitions/MDKApp/Pages/Customers/Customers_Detail.page")
let mdkapp_pages_customers_customers_edit_page = __webpack_require__(/*! ./MDKApp/Pages/Customers/Customers_Edit.page */ "./build.definitions/MDKApp/Pages/Customers/Customers_Edit.page")
let mdkapp_pages_customers_customers_list_page = __webpack_require__(/*! ./MDKApp/Pages/Customers/Customers_List.page */ "./build.definitions/MDKApp/Pages/Customers/Customers_List.page")
let mdkapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let mdkapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDKApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_List.page")
let mdkapp_pages_main_page = __webpack_require__(/*! ./MDKApp/Pages/Main.page */ "./build.definitions/MDKApp/Pages/Main.page")
let mdkapp_pages_products_products_create_page = __webpack_require__(/*! ./MDKApp/Pages/Products/Products_Create.page */ "./build.definitions/MDKApp/Pages/Products/Products_Create.page")
let mdkapp_pages_products_products_detail_page = __webpack_require__(/*! ./MDKApp/Pages/Products/Products_Detail.page */ "./build.definitions/MDKApp/Pages/Products/Products_Detail.page")
let mdkapp_pages_products_products_edit_page = __webpack_require__(/*! ./MDKApp/Pages/Products/Products_Edit.page */ "./build.definitions/MDKApp/Pages/Products/Products_Edit.page")
let mdkapp_pages_products_products_list_page = __webpack_require__(/*! ./MDKApp/Pages/Products/Products_List.page */ "./build.definitions/MDKApp/Pages/Products/Products_List.page")
let mdkapp_pages_purchaseorderheaders_purchaseorderheaders_create_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page")
let mdkapp_pages_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page")
let mdkapp_pages_purchaseorderheaders_purchaseorderheaders_detail_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page")
let mdkapp_pages_purchaseorderheaders_purchaseorderheaders_edit_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page")
let mdkapp_pages_purchaseorderheaders_purchaseorderheaders_list_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page")
let mdkapp_pages_purchaseorderitems_purchaseorderitems_create_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page")
let mdkapp_pages_purchaseorderitems_purchaseorderitems_detail_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page")
let mdkapp_pages_purchaseorderitems_purchaseorderitems_edit_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page")
let mdkapp_pages_purchaseorderitems_purchaseorderitems_list_page = __webpack_require__(/*! ./MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page */ "./build.definitions/MDKApp/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page")
let mdkapp_pages_salesorderheaders_salesorderheaders_create_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Create.page */ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Create.page")
let mdkapp_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page */ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page")
let mdkapp_pages_salesorderheaders_salesorderheaders_detail_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page */ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page")
let mdkapp_pages_salesorderheaders_salesorderheaders_edit_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page */ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_Edit.page")
let mdkapp_pages_salesorderheaders_salesorderheaders_list_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page */ "./build.definitions/MDKApp/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page")
let mdkapp_pages_salesorderitems_salesorderitems_create_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderItems/SalesOrderItems_Create.page */ "./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Create.page")
let mdkapp_pages_salesorderitems_salesorderitems_detail_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page */ "./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Detail.page")
let mdkapp_pages_salesorderitems_salesorderitems_edit_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page */ "./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_Edit.page")
let mdkapp_pages_salesorderitems_salesorderitems_list_page = __webpack_require__(/*! ./MDKApp/Pages/SalesOrderItems/SalesOrderItems_List.page */ "./build.definitions/MDKApp/Pages/SalesOrderItems/SalesOrderItems_List.page")
let mdkapp_rules_appupdatefailure_js = __webpack_require__(/*! ./MDKApp/Rules/AppUpdateFailure.js */ "./build.definitions/MDKApp/Rules/AppUpdateFailure.js")
let mdkapp_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDKApp/Rules/AppUpdateSuccess.js */ "./build.definitions/MDKApp/Rules/AppUpdateSuccess.js")
let mdkapp_rules_customers_customers_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/Customers/Customers_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/Customers/Customers_DeleteConfirmation.js")
let mdkapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/MDKApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let mdkapp_rules_onwillupdate_js = __webpack_require__(/*! ./MDKApp/Rules/OnWillUpdate.js */ "./build.definitions/MDKApp/Rules/OnWillUpdate.js")
let mdkapp_rules_products_products_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/Products/Products_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/Products/Products_DeleteConfirmation.js")
let mdkapp_rules_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js")
let mdkapp_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js")
let mdkapp_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDKApp/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDKApp/Rules/ResetAppSettingsAndLogout.js")
let mdkapp_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js")
let mdkapp_rules_salesorderitems_salesorderitems_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js")
let mdkapp_services_sampleservicev2_service = __webpack_require__(/*! ./MDKApp/Services/SampleServiceV2.service */ "./build.definitions/MDKApp/Services/SampleServiceV2.service")
let mdkapp_styles_styles_css = __webpack_require__(/*! ./MDKApp/Styles/Styles.css */ "./build.definitions/MDKApp/Styles/Styles.css")
let mdkapp_styles_styles_json = __webpack_require__(/*! ./MDKApp/Styles/Styles.json */ "./build.definitions/MDKApp/Styles/Styles.json")
let mdkapp_styles_styles_less = __webpack_require__(/*! ./MDKApp/Styles/Styles.less */ "./build.definitions/MDKApp/Styles/Styles.less")
let mdkapp_styles_styles_nss = __webpack_require__(/*! ./MDKApp/Styles/Styles.nss */ "./build.definitions/MDKApp/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdkapp_actions_appupdate_action : mdkapp_actions_appupdate_action,
	mdkapp_actions_appupdatefailuremessage_action : mdkapp_actions_appupdatefailuremessage_action,
	mdkapp_actions_appupdateprogressbanner_action : mdkapp_actions_appupdateprogressbanner_action,
	mdkapp_actions_appupdatesuccessmessage_action : mdkapp_actions_appupdatesuccessmessage_action,
	mdkapp_actions_closemodalpage_cancel_action : mdkapp_actions_closemodalpage_cancel_action,
	mdkapp_actions_closemodalpage_complete_action : mdkapp_actions_closemodalpage_complete_action,
	mdkapp_actions_closepage_action : mdkapp_actions_closepage_action,
	mdkapp_actions_createentityfailuremessage_action : mdkapp_actions_createentityfailuremessage_action,
	mdkapp_actions_createentitysuccessmessage_action : mdkapp_actions_createentitysuccessmessage_action,
	mdkapp_actions_custom_closemodalpage_cancel_action : mdkapp_actions_custom_closemodalpage_cancel_action,
	mdkapp_actions_custom_closemodalpage_complete_action : mdkapp_actions_custom_closemodalpage_complete_action,
	mdkapp_actions_custom_custom_customer_updateentity_action : mdkapp_actions_custom_custom_customer_updateentity_action,
	mdkapp_actions_custom_navto_custom_customer_detail_action : mdkapp_actions_custom_navto_custom_customer_detail_action,
	mdkapp_actions_custom_navtocustom_customers_edit_action : mdkapp_actions_custom_navtocustom_customers_edit_action,
	mdkapp_actions_custom_navtocustomcustomers_list_action : mdkapp_actions_custom_navtocustomcustomers_list_action,
	mdkapp_actions_custom_updatecustomerentityfailuremessage_action : mdkapp_actions_custom_updatecustomerentityfailuremessage_action,
	mdkapp_actions_customers_customers_createentity_action : mdkapp_actions_customers_customers_createentity_action,
	mdkapp_actions_customers_customers_createsalesorderheader_action : mdkapp_actions_customers_customers_createsalesorderheader_action,
	mdkapp_actions_customers_customers_deleteentity_action : mdkapp_actions_customers_customers_deleteentity_action,
	mdkapp_actions_customers_customers_detailpopover_action : mdkapp_actions_customers_customers_detailpopover_action,
	mdkapp_actions_customers_customers_updateentity_action : mdkapp_actions_customers_customers_updateentity_action,
	mdkapp_actions_customers_navtocustomers_create_action : mdkapp_actions_customers_navtocustomers_create_action,
	mdkapp_actions_customers_navtocustomers_createsalesorderheader_action : mdkapp_actions_customers_navtocustomers_createsalesorderheader_action,
	mdkapp_actions_customers_navtocustomers_detail_action : mdkapp_actions_customers_navtocustomers_detail_action,
	mdkapp_actions_customers_navtocustomers_edit_action : mdkapp_actions_customers_navtocustomers_edit_action,
	mdkapp_actions_customers_navtocustomers_list_action : mdkapp_actions_customers_navtocustomers_list_action,
	mdkapp_actions_deleteconfirmation_action : mdkapp_actions_deleteconfirmation_action,
	mdkapp_actions_deleteentityfailuremessage_action : mdkapp_actions_deleteentityfailuremessage_action,
	mdkapp_actions_deleteentitysuccessmessage_action : mdkapp_actions_deleteentitysuccessmessage_action,
	mdkapp_actions_errorarchive_errorarchive_syncfailure_action : mdkapp_actions_errorarchive_errorarchive_syncfailure_action,
	mdkapp_actions_errorarchive_navtoerrorarchive_detail_action : mdkapp_actions_errorarchive_navtoerrorarchive_detail_action,
	mdkapp_actions_errorarchive_navtoerrorarchive_list_action : mdkapp_actions_errorarchive_navtoerrorarchive_list_action,
	mdkapp_actions_logout_action : mdkapp_actions_logout_action,
	mdkapp_actions_logoutmessage_action : mdkapp_actions_logoutmessage_action,
	mdkapp_actions_onwillupdate_action : mdkapp_actions_onwillupdate_action,
	mdkapp_actions_products_navtoproducts_create_action : mdkapp_actions_products_navtoproducts_create_action,
	mdkapp_actions_products_navtoproducts_detail_action : mdkapp_actions_products_navtoproducts_detail_action,
	mdkapp_actions_products_navtoproducts_edit_action : mdkapp_actions_products_navtoproducts_edit_action,
	mdkapp_actions_products_navtoproducts_list_action : mdkapp_actions_products_navtoproducts_list_action,
	mdkapp_actions_products_products_createentity_action : mdkapp_actions_products_products_createentity_action,
	mdkapp_actions_products_products_deleteentity_action : mdkapp_actions_products_products_deleteentity_action,
	mdkapp_actions_products_products_detailpopover_action : mdkapp_actions_products_products_detailpopover_action,
	mdkapp_actions_products_products_opendocument_action : mdkapp_actions_products_products_opendocument_action,
	mdkapp_actions_products_products_updateentity_action : mdkapp_actions_products_products_updateentity_action,
	mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_create_action : mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_create_action,
	mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action : mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action,
	mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action : mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action,
	mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_edit_action : mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_edit_action,
	mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action : mdkapp_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action,
	mdkapp_actions_purchaseorderheaders_purchaseorderheaders_createentity_action : mdkapp_actions_purchaseorderheaders_purchaseorderheaders_createentity_action,
	mdkapp_actions_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action : mdkapp_actions_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action,
	mdkapp_actions_purchaseorderheaders_purchaseorderheaders_deleteentity_action : mdkapp_actions_purchaseorderheaders_purchaseorderheaders_deleteentity_action,
	mdkapp_actions_purchaseorderheaders_purchaseorderheaders_detailpopover_action : mdkapp_actions_purchaseorderheaders_purchaseorderheaders_detailpopover_action,
	mdkapp_actions_purchaseorderheaders_purchaseorderheaders_updateentity_action : mdkapp_actions_purchaseorderheaders_purchaseorderheaders_updateentity_action,
	mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_create_action : mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_create_action,
	mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action : mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_detail_action,
	mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_edit_action : mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_edit_action,
	mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_list_action : mdkapp_actions_purchaseorderitems_navtopurchaseorderitems_list_action,
	mdkapp_actions_purchaseorderitems_purchaseorderitems_createentity_action : mdkapp_actions_purchaseorderitems_purchaseorderitems_createentity_action,
	mdkapp_actions_purchaseorderitems_purchaseorderitems_deleteentity_action : mdkapp_actions_purchaseorderitems_purchaseorderitems_deleteentity_action,
	mdkapp_actions_purchaseorderitems_purchaseorderitems_updateentity_action : mdkapp_actions_purchaseorderitems_purchaseorderitems_updateentity_action,
	mdkapp_actions_salesorderheaders_navtosalesorderheaders_create_action : mdkapp_actions_salesorderheaders_navtosalesorderheaders_create_action,
	mdkapp_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action : mdkapp_actions_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action,
	mdkapp_actions_salesorderheaders_navtosalesorderheaders_detail_action : mdkapp_actions_salesorderheaders_navtosalesorderheaders_detail_action,
	mdkapp_actions_salesorderheaders_navtosalesorderheaders_edit_action : mdkapp_actions_salesorderheaders_navtosalesorderheaders_edit_action,
	mdkapp_actions_salesorderheaders_navtosalesorderheaders_list_action : mdkapp_actions_salesorderheaders_navtosalesorderheaders_list_action,
	mdkapp_actions_salesorderheaders_salesorderheaders_createentity_action : mdkapp_actions_salesorderheaders_salesorderheaders_createentity_action,
	mdkapp_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action : mdkapp_actions_salesorderheaders_salesorderheaders_createsalesorderitem_action,
	mdkapp_actions_salesorderheaders_salesorderheaders_deleteentity_action : mdkapp_actions_salesorderheaders_salesorderheaders_deleteentity_action,
	mdkapp_actions_salesorderheaders_salesorderheaders_detailpopover_action : mdkapp_actions_salesorderheaders_salesorderheaders_detailpopover_action,
	mdkapp_actions_salesorderheaders_salesorderheaders_updateentity_action : mdkapp_actions_salesorderheaders_salesorderheaders_updateentity_action,
	mdkapp_actions_salesorderitems_navtosalesorderitems_create_action : mdkapp_actions_salesorderitems_navtosalesorderitems_create_action,
	mdkapp_actions_salesorderitems_navtosalesorderitems_detail_action : mdkapp_actions_salesorderitems_navtosalesorderitems_detail_action,
	mdkapp_actions_salesorderitems_navtosalesorderitems_edit_action : mdkapp_actions_salesorderitems_navtosalesorderitems_edit_action,
	mdkapp_actions_salesorderitems_navtosalesorderitems_list_action : mdkapp_actions_salesorderitems_navtosalesorderitems_list_action,
	mdkapp_actions_salesorderitems_salesorderitems_createentity_action : mdkapp_actions_salesorderitems_salesorderitems_createentity_action,
	mdkapp_actions_salesorderitems_salesorderitems_deleteentity_action : mdkapp_actions_salesorderitems_salesorderitems_deleteentity_action,
	mdkapp_actions_salesorderitems_salesorderitems_updateentity_action : mdkapp_actions_salesorderitems_salesorderitems_updateentity_action,
	mdkapp_actions_service_closeoffline_action : mdkapp_actions_service_closeoffline_action,
	mdkapp_actions_service_closeofflinefailuremessage_action : mdkapp_actions_service_closeofflinefailuremessage_action,
	mdkapp_actions_service_closeofflinesuccessmessage_action : mdkapp_actions_service_closeofflinesuccessmessage_action,
	mdkapp_actions_service_downloadoffline_action : mdkapp_actions_service_downloadoffline_action,
	mdkapp_actions_service_downloadstartedmessage_action : mdkapp_actions_service_downloadstartedmessage_action,
	mdkapp_actions_service_initializeoffline_action : mdkapp_actions_service_initializeoffline_action,
	mdkapp_actions_service_initializeofflinefailuremessage_action : mdkapp_actions_service_initializeofflinefailuremessage_action,
	mdkapp_actions_service_initializeofflinesuccessmessage_action : mdkapp_actions_service_initializeofflinesuccessmessage_action,
	mdkapp_actions_service_syncfailuremessage_action : mdkapp_actions_service_syncfailuremessage_action,
	mdkapp_actions_service_syncstartedmessage_action : mdkapp_actions_service_syncstartedmessage_action,
	mdkapp_actions_service_syncsuccessmessage_action : mdkapp_actions_service_syncsuccessmessage_action,
	mdkapp_actions_service_uploadoffline_action : mdkapp_actions_service_uploadoffline_action,
	mdkapp_actions_updateentityfailuremessage_action : mdkapp_actions_updateentityfailuremessage_action,
	mdkapp_actions_updateentitysuccessmessage_action : mdkapp_actions_updateentitysuccessmessage_action,
	mdkapp_globals_appdefinition_version_global : mdkapp_globals_appdefinition_version_global,
	mdkapp_i18n_i18n_properties : mdkapp_i18n_i18n_properties,
	mdkapp_jsconfig_json : mdkapp_jsconfig_json,
	mdkapp_pages_custom_custom_customer_detail_page : mdkapp_pages_custom_custom_customer_detail_page,
	mdkapp_pages_custom_custom_customer_list_page : mdkapp_pages_custom_custom_customer_list_page,
	mdkapp_pages_custom_custom_customers_edit_page : mdkapp_pages_custom_custom_customers_edit_page,
	mdkapp_pages_customers_customers_create_page : mdkapp_pages_customers_customers_create_page,
	mdkapp_pages_customers_customers_createsalesorderheader_page : mdkapp_pages_customers_customers_createsalesorderheader_page,
	mdkapp_pages_customers_customers_detail_page : mdkapp_pages_customers_customers_detail_page,
	mdkapp_pages_customers_customers_edit_page : mdkapp_pages_customers_customers_edit_page,
	mdkapp_pages_customers_customers_list_page : mdkapp_pages_customers_customers_list_page,
	mdkapp_pages_errorarchive_errorarchive_detail_page : mdkapp_pages_errorarchive_errorarchive_detail_page,
	mdkapp_pages_errorarchive_errorarchive_list_page : mdkapp_pages_errorarchive_errorarchive_list_page,
	mdkapp_pages_main_page : mdkapp_pages_main_page,
	mdkapp_pages_products_products_create_page : mdkapp_pages_products_products_create_page,
	mdkapp_pages_products_products_detail_page : mdkapp_pages_products_products_detail_page,
	mdkapp_pages_products_products_edit_page : mdkapp_pages_products_products_edit_page,
	mdkapp_pages_products_products_list_page : mdkapp_pages_products_products_list_page,
	mdkapp_pages_purchaseorderheaders_purchaseorderheaders_create_page : mdkapp_pages_purchaseorderheaders_purchaseorderheaders_create_page,
	mdkapp_pages_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page : mdkapp_pages_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page,
	mdkapp_pages_purchaseorderheaders_purchaseorderheaders_detail_page : mdkapp_pages_purchaseorderheaders_purchaseorderheaders_detail_page,
	mdkapp_pages_purchaseorderheaders_purchaseorderheaders_edit_page : mdkapp_pages_purchaseorderheaders_purchaseorderheaders_edit_page,
	mdkapp_pages_purchaseorderheaders_purchaseorderheaders_list_page : mdkapp_pages_purchaseorderheaders_purchaseorderheaders_list_page,
	mdkapp_pages_purchaseorderitems_purchaseorderitems_create_page : mdkapp_pages_purchaseorderitems_purchaseorderitems_create_page,
	mdkapp_pages_purchaseorderitems_purchaseorderitems_detail_page : mdkapp_pages_purchaseorderitems_purchaseorderitems_detail_page,
	mdkapp_pages_purchaseorderitems_purchaseorderitems_edit_page : mdkapp_pages_purchaseorderitems_purchaseorderitems_edit_page,
	mdkapp_pages_purchaseorderitems_purchaseorderitems_list_page : mdkapp_pages_purchaseorderitems_purchaseorderitems_list_page,
	mdkapp_pages_salesorderheaders_salesorderheaders_create_page : mdkapp_pages_salesorderheaders_salesorderheaders_create_page,
	mdkapp_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page : mdkapp_pages_salesorderheaders_salesorderheaders_createsalesorderitem_page,
	mdkapp_pages_salesorderheaders_salesorderheaders_detail_page : mdkapp_pages_salesorderheaders_salesorderheaders_detail_page,
	mdkapp_pages_salesorderheaders_salesorderheaders_edit_page : mdkapp_pages_salesorderheaders_salesorderheaders_edit_page,
	mdkapp_pages_salesorderheaders_salesorderheaders_list_page : mdkapp_pages_salesorderheaders_salesorderheaders_list_page,
	mdkapp_pages_salesorderitems_salesorderitems_create_page : mdkapp_pages_salesorderitems_salesorderitems_create_page,
	mdkapp_pages_salesorderitems_salesorderitems_detail_page : mdkapp_pages_salesorderitems_salesorderitems_detail_page,
	mdkapp_pages_salesorderitems_salesorderitems_edit_page : mdkapp_pages_salesorderitems_salesorderitems_edit_page,
	mdkapp_pages_salesorderitems_salesorderitems_list_page : mdkapp_pages_salesorderitems_salesorderitems_list_page,
	mdkapp_rules_appupdatefailure_js : mdkapp_rules_appupdatefailure_js,
	mdkapp_rules_appupdatesuccess_js : mdkapp_rules_appupdatesuccess_js,
	mdkapp_rules_customers_customers_deleteconfirmation_js : mdkapp_rules_customers_customers_deleteconfirmation_js,
	mdkapp_rules_errorarchive_errorarchive_checkforsyncerror_js : mdkapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdkapp_rules_onwillupdate_js : mdkapp_rules_onwillupdate_js,
	mdkapp_rules_products_products_deleteconfirmation_js : mdkapp_rules_products_products_deleteconfirmation_js,
	mdkapp_rules_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js : mdkapp_rules_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js,
	mdkapp_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js : mdkapp_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js,
	mdkapp_rules_resetappsettingsandlogout_js : mdkapp_rules_resetappsettingsandlogout_js,
	mdkapp_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js : mdkapp_rules_salesorderheaders_salesorderheaders_deleteconfirmation_js,
	mdkapp_rules_salesorderitems_salesorderitems_deleteconfirmation_js : mdkapp_rules_salesorderitems_salesorderitems_deleteconfirmation_js,
	mdkapp_services_sampleservicev2_service : mdkapp_services_sampleservicev2_service,
	mdkapp_styles_styles_css : mdkapp_styles_styles_css,
	mdkapp_styles_styles_json : mdkapp_styles_styles_json,
	mdkapp_styles_styles_less : mdkapp_styles_styles_less,
	mdkapp_styles_styles_nss : mdkapp_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map