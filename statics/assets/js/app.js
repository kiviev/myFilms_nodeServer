
async function searchExternalApi(term){
    const searchMovieURL = apiBaseURL + 'search/movie?language=es-ES&api_key=' + apiKey + '&page=1&include_adult=false&query=' + term;
            // console.log(searchMovieURL);
     $.getJSON(searchMovieURL, function (movieSearchResults) {
        let results = movieSearchResults.results
        console.log(movieSearchResults.results);
        if(results.length){
            results.forEach(async function(res,index){
                let simpleData = await getDataFilmById(res.id, "#card_" + index, index);
            })
        }
    });
}

async function getDataFilmById(idapi,selection,index) {

    const searchMovieURL = apiBaseURL + 'movie/' + idapi + '?language=es-ES&append_to_response=videos&api_key=' + apiKey ;
    // console.log(searchMovieURL);
    $.getJSON(searchMovieURL,  function (results) {
        console.log(results);
        
        if(results){
            addCard( createCard(results,index));
        }
    })
}


function createCard(data,index){
    let modal = createModalCard(data,index)
    return `${modal}
    <div id="card_${index}" class="col-xs-6 col-sm-4 col-lg-3">    
            <div class="thumbnail ">
                <img src="${imageBaseUrl}w300/${data.poster_path}">
                <div class="caption">
                <h3>${data.title}</h2>
                    <p class="flex-text text-muted">${data.overview.length < 50 ? data.overview : data.overview.substr(0, 50) + " ..."}</p>
                    <p class="flex-text text-muted">${data.vote_average}</p>
                    <p>
                    <button class="btn btn-primary" data-idApi="${data.id}" >Anadir</button>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#modalCard_${index}" data-idApi="${data.id}" >Mas info</button>
                    </p>
                </div>
                <!-- /.caption -->
                
            </div>
            <!-- /.thumbnail -->
          </div>`;
}


function createModalCard(data,id){
    let linkToTrailer = '';
    let youtubelink = '';
    let imagelink = `<img src="${imageBaseUrl}w300/${data.poster_path}">`;
    if (data.videos && data.videos.results.length && data.videos.results[0].site === 'YouTube') {
        youtubelink = "https://www.youtube.com/watch?v=" + data.videos.results[0].key;
        linkToTrailer = `<div class="linkToTrailer">
                                <a href="${youtubelink}" target="_blank">
                                    <span class="glyphicon glyphicon-play"></span>&nbsp;Play trailer</a>
                            </div>`;
        imagelink = `<a href="${youtubelink}" target="_blank">
                        <img src="${imageBaseUrl}w300/${data.poster_path}">
                    </a>`
    }


        return `<div class="modal fade my-modal" id="modalCard_${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content col-sm-12">
                <div class="col-sm-6 moviePosterInModal">
                    ${imagelink}
                </div>
                <div class="col-sm-6 movieDetails">
                    <div class="movieName">${data.title}</div>
                    <br>
                    ${linkToTrailer}
                    <br>
                    <div class="release">Fecha del Estreno: ${data.release_date}</div>
                    <br>
                    <div class="overview">${data.overview}</div>
                    <br>
                    <div class="rating">Rating: ${data.vote_average}/10</div>
                    <br>
                    <div class="col-sm-3 btn btn-primary">Añadir</div>
                    <div class="col-sm-3 btn btn-danger" data-dismiss="modal">Cerrar</div>
                </div>
            </div>
        </div>
    </div>`;
}

function addModal(html,selection){
    $(selection).prepend(html);
}

function addCard(html){
    $('#gridCards').append(html)
}




$(document).ready(function(){
    $('form.form-inline-search').submit(function (event) {
        event.preventDefault();
        //search term is only concerned with what the user inputted
        //Get input with .val();
        searchTerm = $('#search_input').val();
        if(searchTerm){
            $('#gridCards').html('');
            searchExternalApi(searchTerm);
        }
    })
})









async function getJson(url,cb){
    await $.getJSON(url,cb);
}

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