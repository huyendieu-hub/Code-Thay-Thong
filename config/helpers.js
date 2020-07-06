const moment = require('moment');
var register = function(Handlebars) {
  var helpers = {
      paginateHelper: function (pagination, options) {
          if (!pagination) {
              return '';
          }

          var limit = 7
              , n;
          var queryParams='';
          var page = parseInt(pagination.page);
          var leftText = '<i class="fa fa-chevron-left"></i>';
          var rightText = '<i class="fa fa-chevron-right"></i>';
          var paginationClass = 'pagination pagination-sm';

          if (options.hash.limit) limit = +options.hash.limit;
          if (options.hash.leftText) leftText = options.hash.leftText;
          if (options.hash.rightText) rightText = options.hash.rightText;
          if (options.hash.paginationClass) paginationClass = options.hash.paginationClass;

          var pageCount = Math.ceil(pagination.totalRows / pagination.limit);

          //query params
          if(pagination.queryParams){
              queryParams = '&';
              for (var key in pagination.queryParams) {
                  if (pagination.queryParams.hasOwnProperty(key) && key !== 'page') {
                      queryParams += key+"="+pagination.queryParams[key]+"&";
                  }
              }
              var lastCharacterOfQueryParams = queryParams.substring(queryParams.length,-1);

              if(lastCharacterOfQueryParams === "&"){
                  //trim off last & character
                  queryParams = queryParams.substring(0,queryParams.length-1);
              }
          }


          var template = '<ul class="' + paginationClass + '">';

          // ========= Previous Button ===============
          if (page === 1) {
              n = 1;
              template = template + '<li class="page-item disabled"><a class="page-link" href="?page=' + n + queryParams + '">'+ leftText +'</a></li>';
          }
          else {
              n = page - 1;
              template = template + '<li class="page-item"><a class="page-link" href="?page=' + n + queryParams + '">'+ leftText +'</a></li>';
          }

          // ========= Page Numbers Middle ======

          var i = 0;
          var leftCount = Math.ceil(limit / 2) - 1;
          var rightCount = limit - leftCount - 1;
          if (page + rightCount > pageCount) {
              leftCount = limit - (pageCount - page) - 1;
          }
          if (page - leftCount < 1) {
              leftCount = page - 1;
          }
          var start = page - leftCount;

          while (i < limit && i < pageCount) {
              n = start;
              if (start === page) {
                  template = template + '<li class="page-item active"><a class="page-link" href="?page=' + n + queryParams + '">' + n + '</a></li>';
              } 
              else if(n == pagination.page){
                    template = template + '<li class="page-item active"><a class="page-link" href="?page=' + n + queryParams + '">' + n + '</a></li>';
              }
              else {
                  template = template + '<li class="page-item"><a class="page-link" href="?page=' + n + queryParams + '">' + n + '</a></li>';
              }

              start++;
              i++;
          }

          // ========== Next Buton ===========
          if (page === pageCount) {
              n = pageCount;
              template = template + '<li class="page-item disabled"><a class="page-link" href="?page=' + n + queryParams + '">'+ rightText +'</i></a></li>';
          }
          else {
              n = page + 1;
              template = template + '<li class="page-item"><a class="page-link" href="?page=' + n + queryParams + '">'+ rightText +'</a></li>';
          }
          template = template + '</ul>';
          return template;
      },
      if_equal: function(a, b, opts) {
            if (a == b) {
                return opts.fn(this)
            } else {
                return opts.inverse(this)
            }
      },
      switch: function(value, options) {
          this._switch_value_ = value;
          var html = options.fn(this); // Process the body of the switch block
          delete this._switch_value_;
          return html;
      },
      case: function(value, options) {
          if (value == this._switch_value_) {
              return options.fn(this);
          }
      },
      if_equal_string: function(a, b, opts) {
            if (a.equals(b) == true) {
                return opts.fn(this)
            } else {
                return opts.inverse(this)
            }
      },
      incremented: function(index, page){
        index++;
        return (page-1)*10 + index;
      },
      iff: function(a, operator, b, opts) {
        var bool = false;
        switch(operator) {
           case '==':
               bool = a == b;
               break;
           case '>':
               bool = a > b;
               break;
           case '<':
               bool = a < b;
               break;
           default:
               throw "Unknown operator " + operator;
        }

        if (bool) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
      },
      toJSON: function(context) {
         return JSON.stringify(context)[0];
      },
      comingFrom: function(context){
        if(context == 1){
          return "Cơ quan y tế";
        }else if(context == 2){
          return "Tự đến";
        }else if(context == 3){
          return "khác";
        }
      },
      arrivedDepartment: function(context){
        if(context == 0){
          return "Không";
        }else if(context == 1){
          return "Khoa cấp cứu"
        }else if(context == 2){
          return "Khoa khám bệnh";
        }else if(context == 3){
          return "Khoa điều trị";
        }
      },
      format_date: function (date, format) {
            return moment(date).format(format);
      },
  };

   return helpers;
};

module.exports.register = register;
module.exports.helpers = register(null);    