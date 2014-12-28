angular
    .module('ZooApp')
    .service('ConfirmService', ['SweetAlert', function(SweetAlert){
        return {
            remove: function(callback){
                SweetAlert.swal({
                    title: 'Вы уверены что хотите удалить?',
                    //text: 'Данные будут удалены безвозвратно!',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Отмена',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Да, уверен'
                }, function (confirm) {
                    if (callback) {
                        callback(confirm);
                    }
                });
            }
        };
    }]);
