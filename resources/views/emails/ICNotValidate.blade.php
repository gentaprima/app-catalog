@extends('beautymail::templates.widgets')

@section('content')

    

    @include('beautymail::templates.widgets.newfeatureStart')
        <tr>
            <td class="title">
                Dear User
            </td>
        </tr>
        <tr>
            <td class="paragraph">
                <p>Your e-cataloguing request has been recorded</p>
                <table width='100%'>
                    <tr>
                        <td style='width:20%''>From</td>
                        <td style='width:1%'>:</td>
                        <td>{{ $from }}</td>
                    </tr>
                    <tr>
                        <td>Catalog Number</td>
                        <td>:</td>
                        <td>{{ $catalog_no }}</td>
                    </tr>
                    <tr>
                        <td>SAP Number</td>
                        <td>:</td>
                        <td>{{ $sap_no }}</td>
                    </tr>
                    <tr>
                        <td>Short Text</td>
                        <td>:</td>
                        <td>{{ $short_text }}</td>
                    </tr>
                    <tr>
                        <td>Plant</td>
                        <td>:</td>
                        <td>{{ $plant }}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>:</td>
                        <td>Not Appoval</td>
                    </tr>
                    <tr>
                    <td>Catagory</td>
                    <td>:</td>
                    <td>{{ $Catagory }}</td>
                  </tr>
                  <tr>
                    <td>Note</td>
                    <td>:</td>
                    <td>{{ $Note }}</td>
                  </tr>
                  <tr>
                    <td>Material Owner</td>
                    <td>:</td>
                    <td>{{ $mat_owner }}</td>
                  </tr>
                  <tr>
                  <td>Link</td>
                    <td>:</td>
                    <td> <a href="#http://e-catalog.com">e-catalog abm-investama </a></td>
                  </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="100%" height="25"></td>
        </tr>
        <tr>
            <td width="100%" height="5">Regard</td>
        </tr>
        <tr>
            <td width="100%" height="5">{{$regard}}</td>
        </tr>
    @include('beautymail::templates.widgets.newfeatureEnd')
@stop