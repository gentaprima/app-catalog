Material Number	Material Type	Material Description 	Base UoM	Material Group
@foreach($data as $row)
{{ $row['sap_material_code'] }}	{{ $row['material_type'] }}	{!! $row['short_description'] !!}	{{ $row['base_uom'] }}	{{ $row['material_group'] }}
@endforeach
