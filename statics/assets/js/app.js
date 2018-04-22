function getData(type, cb) {
    $.getJSON("/api/v1/film/", cb);
}
function printList(data) {
    var lista = $('.lista');
    var indice = 1;
    $.each(data, function (index, value) {
        var str = '<li class="list-group-item list-group-item-action flex-column align-items-start">' +
            '<div class="card">' +
            '<img class="card-img-top" src="' + value.img + '" alt="' + value.title + '">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + value.title + '</h5>' +
            '<p class="card-text">' + value.description + '</p>' +
            '</div>' +
            '<div class="card-body">' +
            '<a href="' + value.urlinfo + '" class="card-link" target="_blank">Encontrada</a>' +
            '<a href="javascript:void" id="filmafinity_' + indice + '" data-url="' + value.filmafinity + '" class="card-link" target="_blank" onclick="changeFilmafinity(' + indice + ')">FilmAfinity</a>' +
            '</div>' +
            '</div>' +
            '<button id="video_' + indice + '" type="button" class="btn btn-info btn-lg btn-block" data-url="' + value.video.url + '" onclick="changeVideo(' + indice + ')" >Ver</button>' +
            '</div>' +
            '</li>';

        lista.append(str);
        indice++;
    });
}

function changeVideo(id) {
    console.log('xxxxx');
    var videoTag = $('#my-video');
    var player = videojs.getPlayer('my-video');
    player.pause();
    var buttonVideo = $('#video_' + id);
    var url = buttonVideo.data('url');
    var src = {
        src: url,
        type: 'video/mp4'
    }
    player.src(src);

}
function changeFilmafinity(id) {
    var iframe = $('#my-iframe');
    var button = $('#filmafinity_' + id);
    var url = button.data('url');
    iframe.attr('src', url);
}

function recopilarInfo(form) {
    var data = $(form).serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    if (data.tile && data.urlinfo && data.urlfilmafinity && data.urlimage && data.description && data.nameserver && data.urlvideo) {
        return data
    }
    return false; //don't submit
}
// function sendFirestore(data){
// console.log(data);

// 	var obj = {
// 				"title" : data.tile,
// 				"urlinfo" : data.urlinfo,
// 				"filmafinity" : data.urlfilmafinity,
// 				"img" : data.urlimage,
// 				"description" : data.description,
// 				"video" : {
// 				"server" : data.nameserver,
// 				"url": data.urlvideo
// 				}
// 	}
// 	var db = firebase.firestore();
// 	console.log(obj);
// 	db.collection("pelis").add(obj)
// 	.then(function(docRef) {
// 	    console.log("Document written with ID: ", docRef.id);
// 	})
// 	.catch(function(error) {
// 	    console.error("Error adding document: ", error);
// 	});
// }






$(document).ready(function () {
    var data = getData('pelis', printList);
    $('#datavideo').submit(function (e) {
        e.preventDefault();
        var datos = recopilarInfo(this);
        sendFirestore(datos);
    })
})