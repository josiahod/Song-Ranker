var apikey = "9f3a144b762612624edfc59b0e3451ad";
var artist = prompt("artist name");
var album = "melodrama" //prompt("album name");
var albumList = new Array();
 
 async function load() 
    {
      var url = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&autocorrect=1&api_key=" + apikey + "&format=json";
      let obj = await (await fetch(url)).json();
      var namMember = new Array();
      for (var i = 0; (i < obj.topalbums.album.length) && (i < 20); i++) 
      {
        albumList.push(obj.topalbums.album[i].name) 
      }
      console.log(albumList);

      var select = document.getElementById("selectNumber");

      for(var i = 0; i < albumList.length; i++) 
      {
        var opt = albumList[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }


    }

    load();
