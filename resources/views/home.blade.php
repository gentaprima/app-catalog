@extends('master')
<center>
    <!-- <button onclick="add()">asda</button> -->

</center>
<script>
    function add() {
        $.ajax({
            type: "post",
            url: '/SaveIncCharacteristics',
            dataType: "json",
            data: {
                _token: csrf_token,
                "id" :"412295",
                "inc_m_id": 2,
                "inc": "00003",
                "characteristics_m_id": "1540",
                "characteristics": "BODY STYLEE",
                "type": "O",
                "mrcode": "AAQL"
            },
            success: function(response) {
                console.log(response);
            }
        })
    }
</script>
@section('title','Home')