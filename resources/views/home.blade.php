@extends('master')
<center>
    <button onclick="add()">asda</button>

</center>
<script>
    function add() {
        $.ajax({
            type: "post",
            url: '/SaveIncCharacteristics',
            dataType: "json",
            data: {
                _token: csrf_token,
                // "id" :"412295",
                "inc_m_id": 1,
                "inc": "00001",
                "characteristics_m_id": "1",
                "characteristics": "60 DEG SPECULAR GLOSS RATING",
                "type": "M",
                "mrcode": "CBHS"
            },
            success: function(response) {
                console.log(response);
            }
        })
    }
</script>
@section('title','Home')