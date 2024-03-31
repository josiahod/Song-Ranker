var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
async function makeList(albumList) 
    {

      var start = new Date().getTime();

      document.getElementById("star").style.display = "none";
    var myPix = new Array("img/Ghost.gif", "img/hourglass.gif", "img/Rhombus.gif", "img/book.gif", "img/plant.gif" );  
    var randomNum = Math.floor(Math.random() * myPix.length);
     document.getElementById("loading").src = myPix[randomNum];
     if(changedArtist.toUpperCase() == "BEYONCE")
     {
      document.getElementById("loading").src = "img/horse.gif";
     }




    document.getElementById("loading").style.display = "block";
     




    document.getElementById("selectNumber").style.display = "none";
    document.getElementById("ArtistButton").style.display = "none";

    document.getElementById("AlbumName").style.display = "block";

      var objTo2 = document.getElementById('AlbumName');
      objTo2.textContent = "Loading";
   
    var select = document.getElementById("selectNumber");

      function removeOptions(selectElement) 
      {
        var i, L = selectElement.options.length - 1;
        for(i = L; i >= 0; i--) {
           selectElement.remove(i);
        }
     }

     removeOptions(select);

     var opt = "Pick An Album";
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);

   var newSongList = new Array();
    

     for(var i = 0; i < albumList.length; i++)
     {
         try 
         {
            let newEncode = encodeURIComponent(albumList[i]);
            var url2 = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apikey + "&artist=" + artNames.dataset.artist + "&album=" + newEncode + "&format=json";
            let obj2 = await (await fetch(url2)).json();
            newSongList.push(albumList[i]);
            var length = obj2.album.tracks.track.length;
            console.log(albumList[i], url2);
            if( isNaN(length) )
            {
            console.log("removed", albumList[i], " one track");
            albumList.splice(i, 1);
            }
         } 
            catch (error) 
            {
               console.log("removed", albumList[i], " error");
               albumList.splice(i, 1);
            }
     }

 

     albumList = albumList.filter(function(val) {
      return newSongList.indexOf(val) >= 0;
    });

   console.log(albumList);
   //console.log(newSongList);





     
      for(var i = 0; i < albumList.length; i++) 
      {
        var opt = albumList[i];
        opt = opt.replace("FOlKlORE", "folklore");
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
      
      document.getElementById("loading").style.display = "none";
      
   
      document.getElementById("selectNumber").style.display = "block";
      document.getElementById("ArtistButton").style.display = "inline-block";

      document.getElementById("AlbumName").style.display = "block";

      var objTo2 = document.getElementById('AlbumName');
      objTo2.textContent = "Select An Album By " + artNames.dataset.artist + " To Rank";


      var end = new Date().getTime();
      var time = end - start;
      console.log(time + "ms");

    }
        
