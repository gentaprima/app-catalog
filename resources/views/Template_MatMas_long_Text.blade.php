@foreach($data as $row)
{{ $row['sap_material_code'] }}	{!! $row['short_text'] !!}
@foreach($row['spec'] as $key=>$spec)
{{ $row['sap_material_code'] }}	{!! $spec !!}
@endforeach
@endforeach
