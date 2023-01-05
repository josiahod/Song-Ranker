async function makeList(albumList) 
    {



    var myPix = new Array("img/ghost.gif", "img/hourglass.gif", "img/Rhombus.gif", "img/book.gif", "img/plant.gif" );  
    var randomNum = Math.floor(Math.random() * myPix.length);
     document.getElementById("loading").src = myPix[randomNum];



    document.getElementById("loading").style.display = "block";
     




    document.getElementById("selectNumber").style.display = "none";

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


     for(var i = 0; i < albumList.length; i++)
     {
         try 
         {
            var url2 = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apikey + "&artist=" + artNames.dataset.artist + "&album=" + albumList[i] + "&format=json";
            let obj2 = await (await fetch(url2)).json();
            var length = obj2.album.tracks.track.length;
            if( isNaN(length) )
            {
                
            }
         } 
         catch (error) 
         {
            console.log("removed", albumList[i]);
            albumList.splice(i, 1);
         }
     }

     for(var i = 0; i < albumList.length; i++)
     {
         try 
         {
            var url2 = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apikey + "&artist=" + artNames.dataset.artist + "&album=" + albumList[i] + "&format=json";
            let obj2 = await (await fetch(url2)).json();
            var length = obj2.album.tracks.track.length;
            if( isNaN(length) )
            {
                console.log("removed", albumList[i]);
            albumList.splice(i, 1);
            }
         } 
            catch (error) 
            {
                
            }
     }

     
      for(var i = 0; i < albumList.length; i++) 
      {
        var opt = albumList[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
      
      document.getElementById("loading").style.display = "none";
      
   
      document.getElementById("selectNumber").style.display = "block";

      document.getElementById("AlbumName").style.display = "block";

      var objTo2 = document.getElementById('AlbumName');
      objTo2.textContent = "Select An Album By " + artNames.dataset.artist + " To Rank";


      

    }
        
