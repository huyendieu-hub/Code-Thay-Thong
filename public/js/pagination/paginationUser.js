  (function() {
    var container = $('#paginate');
    container.pagination({
      dataSource: sources ,
      locator: 'items',
      totalNumber: 120,
      pageSize: 5,
      ajax: {
        beforeSend: function() {
          $('#table').prev().html('<div id="loader"></div>')
        }
      },
      callback: function(data, pagination) {
        //window.console && console.log(22, response, pagination);
        var dataHtml = '';
        i=1;
        $.each(data, function (index, item) {
          dataHtml += '<tr>'  ;
          dataHtml += '<td>' + i/*item.id*/ + '</td>';
          dataHtml += '<td>' + item.username +'</td>';
          dataHtml += '<td>' + item.name + '</td>';
          var permission = '';
          if(item.type == 1){
            permission = "Admin";
          }else if(item.type == 2){
             permission = "Quản lý";
          }else if(item.type == 3){
             permission = "Bác sĩ";
          }else{
             permission = "Bệnh nhân";
          }
          dataHtml += '<td>' + permission +'</td>';
          dataHtml += '<td>20-3-2019</td>';
          dataHtml += '<td>' + '<div class="tools">'
          + '<a href="/users/' + item.id + '"' + ' ' + 'class="btn btn-default"><i class="fa fa-edit"></i></a>'
          + '<a href="/users/details/' + item.id +'"' + 'class="btn btn-default"><i class="fa fa-detail"></i></a>' 
          + '<a href="/users/delete/' + item.id + '"' + 'class="btn btn-default"><i class="fa fa-trash-o"></i></a>' 
          + '</div>' + '</td>' 
          dataHtml += '</tr>'
          //console.log(data);
          i++;
        });
        //console.log(dataHtml)
        $('#tbody_table_user').html(dataHtml);
      }
    })
  }());