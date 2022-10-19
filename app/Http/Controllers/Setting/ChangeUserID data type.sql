ALTER TABLE `abm_sak2018`.`adr_d_items` 
CHANGE COLUMN `sap_material_code_by_id` `sap_material_code_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `cataloguer_by_id` `cataloguer_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `std_approval_by_id` `std_approval_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `proc_approver_by_id` `proc_approver_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `sync_created_by` `sync_created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `sync_updated_by` `sync_updated_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_d_items_characteristic` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_d_items_crossreferences` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_d_items_funcloc` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_d_items_mrp` 
CHANGE COLUMN `inv_controll_by` `inv_controll_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver1_by` `approver1_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver2_by` `approver2_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver3_by` `approver3_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver4_by` `approver4_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver5_by` `approver5_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_d_items_status` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_d_items_view_notes` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_d_notes_deletion` 
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_m` 
CHANGE COLUMN `creator_id` `creator_id` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`adr_m_status` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`audit_adr_d_items` 
CHANGE COLUMN `sap_material_code_by_id` `sap_material_code_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `cataloguer_by_id` `cataloguer_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `std_approval_by_id` `std_approval_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `proc_approver_by_id` `proc_approver_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `sync_created_by` `sync_created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `sync_updated_by` `sync_updated_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`audit_adr_d_items_characteristic` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`audit_adr_d_items_crossreferences` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`audit_adr_d_items_funcloc` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`audit_adr_d_notes_deletion` 
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`audit_trial` 
CHANGE COLUMN `user_id` `user_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `menu_id` `menu_id` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`audits` 
CHANGE COLUMN `user_id` `user_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `auditable_id` `auditable_id` VARCHAR(32) NOT NULL ;

ALTER TABLE `abm_sak2018`.`companies_m` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`conf_form` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`conf_grid` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`conf_layout` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`conf_link` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`deletion_adr_d_items` 
CHANGE COLUMN `sap_material_code_by_id` `sap_material_code_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `cataloguer_by_id` `cataloguer_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `std_approval_by_id` `std_approval_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `proc_approver_by_id` `proc_approver_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`deletion_adr_d_items_characteristic` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`deletion_adr_d_items_crossreferences` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`deletion_adr_d_items_funcloc` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`deletion_adr_d_items_old` 
CHANGE COLUMN `sap_material_code_by` `sap_material_code_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `cataloguer_by` `cataloguer_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `std_approval_by` `std_approval_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `proc_approver_by` `proc_approver_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`deletion_adr_d_items_status` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`deletion_adr_d_items_status_old` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`entity_m` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`groupclass_d` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`inc_images` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`inventory` 
CHANGE COLUMN `inv_controll_by` `inv_controll_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver1_by` `approver1_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver2_by` `approver2_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver3_by` `approver3_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver4_by` `approver4_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver5_by` `approver5_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`inventory_plant` 
CHANGE COLUMN `inv_controll_by_id` `inv_controll_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver1_by_id` `approver1_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver2_by_id` `approver2_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver3_by_id` `approver3_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver4_by_id` `approver4_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver5_by_id` `approver5_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`plant_m` 
CHANGE COLUMN `approver1` `approver1` VARCHAR(255) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_d_items` 
CHANGE COLUMN `sap_material_code_by_id` `sap_material_code_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `cataloguer_by_id` `cataloguer_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `std_approval_by_id` `std_approval_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `proc_approver_by_id` `proc_approver_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_d_items_characteristic` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_d_items_characteristic_old` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_d_items_crossreferences` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_d_items_funcloc` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_d_items_inv` 
CHANGE COLUMN `sap_material_code_by` `sap_material_code_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `cataloguer_by` `cataloguer_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `std_approval_by` `std_approval_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `proc_approver_by` `proc_approver_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_d_items_mrp` 
CHANGE COLUMN `inv_controll_by` `inv_controll_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver1_by` `approver1_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver2_by` `approver2_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver3_by` `approver3_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver4_by` `approver4_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver5_by` `approver5_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NOT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_d_items_status` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_m` 
CHANGE COLUMN `creator_id` `creator_id` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_adr_m_status` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`revision_inventory_plant` 
CHANGE COLUMN `inv_controll_by_id` `inv_controll_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver1_by_id` `approver1_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver2_by_id` `approver2_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver3_by_id` `approver3_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver4_by_id` `approver4_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver5_by_id` `approver5_by_id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`sync_m` 
CHANGE COLUMN `user_id` `user_id` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`temp_adr_d_items` 
CHANGE COLUMN `sap_material_code_by` `sap_material_code_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `cataloguer_by` `cataloguer_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `std_approval_by` `std_approval_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `proc_approver_by` `proc_approver_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`temp_adr_d_items_characteristic` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`temp_adr_d_items_mrp` 
CHANGE COLUMN `inv_controll_by` `inv_controll_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver1_by` `approver1_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver2_by` `approver2_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver3_by` `approver3_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver4_by` `approver4_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `approver5_by` `approver5_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`temp_adr_d_items_status` 
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`temp_adr_m_status` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`transfer_owner_code_m` 
CHANGE COLUMN `old_owner_code` `old_owner_code` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `new_owner_code` `new_owner_code` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `cataloguer_by` `cataloguer_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `proc_approver_by` `proc_approver_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `abm_sak2018`.`valuation_class_m` 
CHANGE COLUMN `created_by` `created_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `deleted_by` `deleted_by` VARCHAR(32) NULL DEFAULT NULL ;
