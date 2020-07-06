// $('#search').keyup(function() {
//     function search() {
//         var x = document.getElementById("search");
//         var value = x.value.trim();
//         console.log(document.getElementById("search").value.trim());
//         if (value = "" || value.length <= 0) {
//             $("#search-results").fadeOut();
//             return;
//         } else {
//             $("#search-results").fadeIn();
//         }
//         ;$.post('https://localhost:1794/users/search?q=' + x.value, function(data, status) {
//             console.log(data)
//             var dataHtml = '';
//             $("#search-results").html(dataHtml);
//         }).done(function(data) {
//             if (data.length === 0) {
//                 $("#search-results").append('<p class="form-control form-control-navbar">No Results</p>');
//             } else {
//                 data.forEach(x=>{
//                     var dataHtml1 = '<a class="form-control form-control-navbar" style="position: relative;width:100%;border-bottom: 1px solid #eee;border-radius:0.25rem; border-right: 1px solid #eee;" href="/users/list/result?q=' + x.name + '"><p style="margin-top:auto;margin-bottom:auto;">' + x.name + '</p></a>'
//                     $("#search-results").append(dataHtml1)
//                 }
//                 )
//             }
//         }).fail(function(err) {
//             console.log(err);
//         })
//     }
//     setTimeout(search, 0);
// })
$(document).ready(function() {
    timeout = null;
    $('#search').keyup(function() {
        clearTimeout(timeout);
        timeout = setTimeout(function search() {
            var x = document.getElementById("search");
            var value = x.value.trim();
            console.log(document.getElementById("search").value.trim());
            if (value = "" || value.length <= 0) {
                $("#search-results").fadeOut();
                return;
            } else {
                $("#search-results").fadeIn();
            }
            var url = '/users/search?q=' + x.value.trim();
            $.ajax({
                method: "post",
                dataType: 'text',
                url: url,
                success: function(result) {
                    var dataHtml = '';
                    $("#search-results").html(dataHtml);
                    if (result.length === 0) {
                        $("#search-results").append('<p class="form-control form-control-navbar">No Results</p>');
                    } else {
                        JSON.parse(result).forEach(x=>{
                            var dataHtml1 = '<a class="form-control form-control-navbar" style="position: relative;width:100%;border-bottom: 1px solid #eee;border-radius:0.25rem; border-right: 1px solid #eee;" href="/users/list/result?q=' + x.name + '"><p style="margin-top:auto;margin-bottom:auto;">' + x.name + '</p></a>'
                            $("#search-results").append(dataHtml1)
                        }
                        )
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }, 1000)
    })
})