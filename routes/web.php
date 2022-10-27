<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// use Illuminate\Routing\Route;

use Illuminate\Support\Facades\Auth;

Auth::routes(); 

// NEW
// ADR & HISTORY
Route::get('/revision-material', 'NavController@revisionMaterial');
Route::get('/revision-service', 'NavController@revisionService');
Route::get('/deletion-material', 'NavController@deletionMaterial');
Route::get('/deletion-service', 'NavController@deletionService');
Route::get('/addition', 'NavController@addition');
Route::get('/addition-history', 'NavController@additionHistory');
// ADR & HISTORY

//MULTIPLE VIEW
Route::get('/multiple-view/material', 'NavController@viewMultipleViewService');
Route::get('/multiple-view/service', 'NavController@viewMultipleViewMaterial');
Route::get('/multiple-view/sync-sap', 'NavController@viewMultipleViewSyncSAP');

// SINGLE VIEW

Route::get('/single-view/material', 'NavController@singleViewMaterial');
Route::get('/single-view/material/{id}', 'NavController@singleViewMaterialById');
Route::post('/add-value-characteristic', 'Catalogue\CatalogueController@addValueCharacteristic');
Route::post('/update-value-characteristic', 'Catalogue\CatalogueController@updateValueCharacteristic');
Route::get('/get-value-characteristic/{adrItems}', 'Catalogue\CatalogueController@getValueCharacteristicById');
Route::get('/get-value-characteristic-all/{adrItems}', 'Catalogue\CatalogueController@getAllValueCharacteristicById');

Route::get('/single-view/service', 'NavController@singleViewService');
Route::get('/single-view/service/{id}', 'NavController@singleViewServiceById');

// SINGLE VIEW

// DICTIONARY
Route::get('/dictionary/material-characteristic', 'NavController@viewMaterialCharacteristic');
Route::get('/dictionary/service-characteristic', 'NavController@viewServiceCharacteristic');
Route::get('/dictionary/material-group-class', 'NavController@viewMaterialGroupClass');
Route::get('/dictionary/service-group-class', 'NavController@viewServiceGroupClass');
Route::get('/dictionary/material-type', 'NavController@viewMaterialType');
Route::get('/dictionary/service-type', 'NavController@viewServiceType');

// DICTIONARY

// NEW
Route::get('/TestMail', 'Addition\AdditionController@TestMail');

Route::get('/', 'HomeController@index')->name('home');
// Route::get('/home', 'HomeController@index')->name('layouts/app');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/logout', 'Auth\LoginController@logout');
Route::get('/keepalive', 'Auth\LoginController@keepalive');
// Route::get('/confirm/{token}', 'Auth\LoginController@confirm');
//Route::get('/SettingTreeMenu', 'Setting\SettingMenuController@SettingTreeMenu');
Route::get('/SettingTreeMenuRead/{root}', 'Setting\SettingMenuController@index');
Route::put('/SettingTreeMenuUpdate', 'Setting\SettingMenuController@update');
Route::resource('/EventMenuDetail', 'Setting\SettingMenuController');
Route::resource('/Users', 'Setting\SettingUsersController');
Route::resource('/UsersGroup', 'Setting\SettingUsersGroupController');
Route::get('/geTrxCode', 'Setting\SettingUsersController@geTrxCode');
Route::get('/geTrxCodeHisto', 'Setting\SettingUsersController@geTrxCodeHisto');
Route::get('/getFlowOwnerCode', 'Setting\SettingUsersController@getFlowOwnerCode');

Route::get('/getUsers', 'Setting\SettingUsersController@getUsers');

Route::post('/getUserProfile', 'Setting\SettingUsersController@getUserProfile');
Route::post('/SaveUser', 'Setting\SettingUsersController@SaveUser');
Route::get('/getOldOwnerCode', 'Setting\SettingUsersController@getOldOwner');
Route::get('/getNewOwnerCode', 'Setting\SettingUsersController@getUsers');

Route::get('/getCompaniesM', 'Setting\CompaniesMController@getCompaniesM');
Route::post('/SaveCompaniesM', 'Setting\CompaniesMController@SaveCompaniesM');
Route::post('/RemoveCompaniesM', 'Setting\CompaniesMController@RemoveCompaniesM');

//Route::get('/SettingTreeMenu/{any?}', 'Setting\SettingMenuController@showMenu')->where('any', '(.*)?');
Route::get('/TreeMenu', 'MenuController@TreeMenu');
Route::get('/RootMenu', 'MenuController@RootMenu');
Route::get('/getRoleEvent', 'MenuController@getRoleEvent');
Route::get('/Icons', 'BaseController@Icons');
Route::get('/LayoutSchema', 'MenuController@LayoutSchema');
Route::get('/conf_link', 'ConfController@ConfLink');
Route::get('/conf_grid', 'ConfController@ConfLink');
Route::get('/conf_grid', 'ConfController@ConfGrid');
Route::get('/conf_grid', 'ConfController@ConfGrid');
Route::resource('/FormSchema', 'DynamicController');
Route::resource('/MainGrid', 'DynamicController');
Route::resource('/GridStore', 'DynamicController');
Route::resource('/Company', 'Setting\CompanyController');
Route::resource('/SettingTreeMenu', 'Setting\SettingMenuController');
Route::get('/getIncMgc', 'INC\IncController@getIncMgc');
Route::get('/getMgcByInc', 'MGC\MgcController@getMgcByInc');
/*///
/// Addition
///*/
Route::post('/CreateAddition', 'Addition\AdditionController@CreateAddition');
Route::get('/getReason', 'Addition\AdditionController@getReason');
Route::post('/SaveImportAddition', 'Addition\AdditionController@SaveImportAddition');
Route::get('/getAdditionHistoryM', 'Addition\AdditionController@getAdditionHistoryM');
Route::get('/getTransferOwner', 'Addition\AdditionController@getTransferOwner');
Route::get('/getAdditionHistoryD', 'Addition\AdditionController@getAdditionHistoryD');
Route::get('/getTransportOwner_p', 'Addition\AdditionController@getTransportOwner_p');

Route::get('/getAddtionCreator', 'Addition\AdditionController@getAdditionHistoryM');
Route::get('/getAddtionCompanyCode', 'Addition\AdditionController@getAdditionHistoryM');
Route::get('/getTemplateAddition', 'Addition\AdditionController@getTemplateAddition');
Route::get('/downloadFile/{file}', 'Addition\AdditionController@downloadFile');
Route::get('/getCatalogM', 'Catalogue\CatalogueController@getCatalogM');
Route::get('/getCatalogM_p', 'Catalogue\CatalogueController@getCatalogM_p');
Route::get('/getCleansingDuplicate', 'CleansingDuplicate\CleansingDuplicateController@getCleansingDuplicate');
Route::get('/getCatalogM_px', 'Catalogue\CatalogueController@getCatalogM_px');

Route::get('/getItemsIncCharacteristics', 'Catalogue\CatalogueController@getItemsIncCharacteristics');
Route::get('/getItemsIncCharacteristicsValue', 'Catalogue\CatalogueController@getItemsIncCharacteristicsValue');
Route::post('downloadExcel/{type}', 'Addition\AdditionController@downloadExcel');



Route::get('/getItemsCrossReferences', 'Catalogue\CatalogueController@getItemsCrossReferences');
Route::post('/SaveItemsCrossReferences', 'Catalogue\CatalogueController@SaveItemsCrossReferences');
Route::post('/DeletedItemsCrossReference', 'Catalogue\CatalogueController@DeletedItemsCrossReference');

Route::get('/getItemsFuncloc', 'Catalogue\CatalogueController@getItemsFuncloc');
Route::post('/SaveItemsFuncloc', 'Catalogue\CatalogueController@SaveItemsFuncloc');
Route::post('/DeletedItemsFuncLoc', 'Catalogue\CatalogueController@DeletedItemsFuncLoc');

Route::get('/getMaterialItemsDocument', 'Addition\AdditionController@getItemsDocument');
Route::post('/SaveMaterialDocument', 'Addition\AdditionController@SaveItemsDocument');
Route::post('/DeleteMaterialDocument', 'Addition\AdditionController@DeleteItemsDocument');

Route::get('/getMaterialItemsImages', 'Addition\AdditionController@getItemsImages');
Route::post('/SaveMaterialImages', 'Addition\AdditionController@SaveItemsImages');
Route::post('/DeleteMaterialImages', 'Addition\AdditionController@DeleteItemsImages');
Route::get('/getServiceItemsDocument', 'Addition\AdditionController@getItemsDocument');
Route::post('/SaveServiceDocument', 'Addition\AdditionController@SaveItemsDocument');
Route::post('/DeleteServiceDocument', 'Addition\AdditionController@DeleteItemsDocument');
Route::get('/SaveMaterialRaw', 'Addition\AdditionController@SaveMaterialRaw');


Route::get('/getServiceItemsImages', 'Addition\AdditionController@getItemsImages');
Route::post('/SaveServiceImages', 'Addition\AdditionController@SaveItemsImages');
Route::post('/DeleteServiceImages', 'Addition\AdditionController@DeleteItemsImages');
/*///
/// Single View
///*/
Route::get('/getItemsViewNotes', 'Catalogue\CatalogueController@getItemsViewNotes');
Route::post('/SaveTranferOwnerCode', 'Catalogue\CatalogueController@SaveTranferOwnerCode');
Route::get('/getTransferOwnerCodeM', 'Catalogue\CatalogueController@getTransferOwnerCodeM');
Route::post('/SaveViewNotesSV', 'Addition\AdditionController@SaveViewNotes');
Route::post('/DeleteViewNotesSV', 'Addition\AdditionController@DeleteViewNotes');
Route::post('/MaterialApplyChanges', 'Addition\AdditionController@SingleViewApplyChanges');
Route::post('/MaterialDeletion', 'Addition\AdditionController@ItemsDeletion');
Route::post('/ServiceDeletion', 'Addition\AdditionController@ItemsDeletion');
Route::post('/ServiceApplyChanges', 'Addition\AdditionController@SingleViewApplyChanges');

Route::get('/getCatalogMInventory', 'Inventory\InventoryController@getCatalogMInventory');

Route::get('/getInventoryPlant', 'Inventory\InventoryController@getInventoryPlant');

Route::post('/SaveInventory', 'Inventory\InventoryController@SaveInventory');
/*///
/// Multiple View
///*/
Route::get('/getMultiViewCatalogM', 'Catalogue\CatalogueController@getMultiViewCatalogM');
Route::post('/ApplyChangeMultiView', 'Catalogue\MultipleViewController@ApplyChangeMultiView');
Route::get('/SyncBatchFiles', 'Catalogue\MultipleViewController@SyncBatchFiles');
//Route::get('/AutoSyncBatchFiles', 'Catalogue\SyncController@AutoSyncBatchFiles');
Route::get('/getSyncM', 'Catalogue\MultipleViewController@getSyncM');
Route::post('/SaveViewNotesMV', 'Addition\AdditionController@SaveViewNotes');
Route::post('ExportMV/{type}', 'Catalogue\MultipleViewController@downloadExcel');
Route::post('ExportMV_All/{type}', 'Catalogue\MultipleViewController@downloadExcel_all');






/*///
/// Revision
///*/
Route::get('/getRevisionCatalogM', 'Addition\RevisionController@getRevisionCatalogM');
Route::get('/getRevisionRequestM', 'Addition\RevisionController@getRevisionRequestM');
Route::get('/getRevisionRequestD', 'Addition\RevisionController@getRevisionRequestD');
Route::post('/RequestItemsRevision', 'Addition\RevisionController@SaveItemsRevision');
Route::post('/ApproveItemsRevision', 'Addition\RevisionController@SaveItemsRevision');
Route::get('/getRevisionItemsIncCharacteristics', 'Addition\RevisionController@getRevisionItemsIncCharacteristics');
Route::get('/getRevisionItemsCrossReferences', 'Addition\RevisionController@getRevisionItemsCrossReferences');
Route::get('/getRevisionItemsFuncloc', 'Addition\RevisionController@getRevisionItemsFuncloc');
Route::get('/getRevisionItemsViewNotes', 'Addition\RevisionController@getRevisionItemsViewNotes');
Route::get('/getAuditAdrDItems', 'Addition\RevisionController@getAuditAdrDItems');
Route::get('/getRevisionAdrDItemsChar', 'Addition\RevisionController@getRevisionAdrDItemsChar');
Route::get('/getAuditAdrDItemsChar', 'Addition\RevisionController@getAuditAdrDItemsChar');

/*///
/// Deletion
///*/
Route::get('/getBlockedCatalogM', 'Addition\DeletionController@getDeletionCatalogM');
Route::get('/getBlockedItemsIncCharacteristics', 'Addition\DeletionController@getBlockedItemsIncCharacteristics');
Route::get('/getBlockedItemsCrossReferences', 'Addition\DeletionController@getBlockedItemsCrossReferences');
Route::get('/getBlockedItemsFuncloc', 'Addition\DeletionController@getBlockedItemsFuncloc');
Route::get('/getBlockedItemsViewNotes', 'Addition\DeletionController@getBlockedItemsViewNotes');
Route::get('/getBlockedRequestM', 'Addition\DeletionController@getBlockedRequestM');
Route::get('/getBlockedRequestD', 'Addition\DeletionController@getBlockedRequestD');
Route::post('/RequestItemsBlocked', 'Addition\DeletionController@SaveItemsBlocked');
Route::post('/ApproveItemsBlocked', 'Addition\DeletionController@SaveItemsBlocked');



/*///
/// Data Tools
///*/
Route::get('/getIncCharacteristicsM', 'DataTools\DataToolsController@getIncCharacteristicsM');
Route::get('/getIncColloquialName', 'DataTools\DataToolsController@getIncColloquialName');
Route::get('/getIncCharacteristicsValue', 'DataTools\DataToolsController@getIncCharacteristicsValue');
Route::get('/getIncImages', 'INC\IncController@getIncImages');
Route::post('/ChangeShortText', 'DataTools\DataToolsController@ChangeShortText');
Route::post('/DeleteIncImages', 'DataTools\DataToolsController@DeleteIncImages');
Route::post('/SaveIncImages', 'DataTools\DataToolsController@SaveIncImages');
Route::post('/SaveIncCharacteristics', 'DataTools\DataToolsController@SaveIncCharacteristics');
Route::post('/DeleteIncCharacteristics', 'DataTools\DataToolsController@DeleteIncCharacteristics');
Route::post('/SaveIncItem', 'DataTools\DataToolsController@SaveIncItem');
Route::post('/DeleteInc', 'DataTools\DataToolsController@DeleteInc');
Route::post('/SaveIncColloquialName', 'DataTools\DataToolsController@SaveIncColloquialName');
Route::post('/DeleteIncColloquialName', 'DataTools\DataToolsController@DeleteIncColloquialName');
Route::get('/getIncMDataTools', 'DataTools\DataToolsController@getIncMDataTools');
Route::post('/SaveIncM', 'DataTools\DataToolsController@SaveIncMNew');
Route::post('/SaveMCG', 'DataTools\DataToolsController@SaveMCG');

Route::post('/MoveIncC/{inc}', 'DataTools\DataToolsController@MoveIncC');

/*///
/// Dictionary
///*/

Route::get('/getMaterialType', 'Dictionary\DictionaryController@getEntity');
Route::get('/getDataTableMaterialType', 'Dictionary\DictionaryController@getEntityData');
Route::get('/getServiceType', 'Dictionary\DictionaryController@getEntity');
Route::get('/getDataTableServiceType', 'Dictionary\DictionaryController@getEntityData');
Route::get('/getUOM', 'Dictionary\DictionaryController@getEntity');
//Route::get('/getAbbreviation', 'Dictionary\DictionaryController@getAbbreviation');
Route::get('/getAbbreviation', 'Dictionary\DictionaryController@getEntity');
Route::get('/get-abbreviation', 'Dictionary\DictionaryController@getEntityData');

//Route::post('/ExportAbrevation', 'Dictionary\DictionaryController@getEntity');
//Route::post('/ExportAbrevation', 'Dictionary\DictionaryController@DownloadAbbrevation');

Route::get('/getCategory', 'Dictionary\DictionaryController@getEntity');
Route::get('/getStockClass', 'Dictionary\DictionaryController@getEntity');
Route::get('/getStockType', 'Dictionary\DictionaryController@getEntity');
Route::get('/getMovingType', 'Dictionary\DictionaryController@getEntity');
Route::get('/getHazardType', 'Dictionary\DictionaryController@getEntity');
Route::get('/getCurrency', 'Dictionary\DictionaryController@getEntity');
Route::get('/getShelfLife', 'Dictionary\DictionaryController@getEntity');
Route::post('/SaveEntityM', 'Dictionary\DictionaryController@SaveEntityM');
Route::post('/RemoveEntityM', 'Dictionary\DictionaryController@RemoveEntityM');
Route::get('/getCharacteristicsM', 'Dictionary\DictionaryController@getCharacteristicsM');
Route::get('/getGroupClassM', 'Dictionary\DictionaryController@getGroupClassM');
Route::post('/ExportAbrevation', 'Dictionary\DictionaryController@ExportAbrevation');

Route::get('/getPlant', 'Dictionary\DictionaryController@getPlant');
Route::post('/SavePlant', 'Dictionary\DictionaryController@SavePlant');
Route::post('/RemovePlant', 'Dictionary\DictionaryController@RemovePlant');

Route::get('/getValuationClass', 'Dictionary\DictionaryController@getValuationClass');
Route::post('/SaveValuationClass', 'Dictionary\DictionaryController@SaveValuationClass');
Route::post('/RemoveValuationClass', 'Dictionary\DictionaryController@RemoveValuationClass');

Route::post('/SaveCharacteristicsM', 'Dictionary\DictionaryController@SaveCharacteristicsM');
Route::post('/RemoveCharacteristicsM', 'Dictionary\DictionaryController@RemoveCharacteristicsM');


Route::post('/SaveImportDataCleansing', 'CleansingDuplicate\CleansingDuplicateController@SaveImportDataCleansing');
Route::get('/getTemplateDataCleansing', 'CleansingDuplicate\CleansingDuplicateController@getTemplateDataCleansing');
Route::get('/getDataCleansing', 'CleansingDuplicate\CleansingDuplicateController@getDataCleansing');
