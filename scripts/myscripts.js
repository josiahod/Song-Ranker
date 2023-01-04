    var apikey = "9f3a144b762612624edfc59b0e3451ad";
    var albumList = new Array();
    var percentPre = 0;


    async function load(album, newArtist) 
    {

      document.getElementById('header').innerHTML = ""; 

      var objTo = document.getElementById('AlbumName');
      objTo.textContent = album + " Ranking";


      var url = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apikey + "&artist=" + newArtist + "&album=" + album + "&format=json";
      let obj = await (await fetch(url)).json();
      var namMember = new Array();
      for (var i = 0; i < obj.album.tracks.track.length; i++) 
      {
        namMember.push(obj.album.tracks.track[i].name) 
      }


      var src = document.getElementById("header");
      var img = document.createElement("img");
      img.src = obj.album.image[3]['#text'] ;
      var src = document.getElementById("header");
      src.appendChild(img);

      var lstMember = new Array();

      var parent = new Array();

      var equal = new Array();

      var rec = new Array();

      var cmp1, cmp2;

      var head1, head2;

      var nrec;



      var numQuestion;

      var totalSize;

      var finishSize;

      var finishFlag;

    

      //The initialization of the variable+++++++++++++++++++++++++++++++++++++++++++++

      function initList() {

        var n = 0;

        var mid;

        var i;



        //The sequence that you should sort

        lstMember[n] = new Array();

        for (i = 0; i < namMember.length; i++) {

          lstMember[n][i] = i;

        }

        parent[n] = -1;

        totalSize = 0;

        n++;



        for (i = 0; i < lstMember.length; i++) {

          //And element divides it in two/more than two

          //Increase divided sequence of last in first member

          if (lstMember[i].length >= 2) {

            mid = Math.ceil(lstMember[i].length / 2);

            lstMember[n] = new Array();

            lstMember[n] = lstMember[i].slice(0, mid);

            totalSize += lstMember[n].length;

            parent[n] = i;

            n++;

            lstMember[n] = new Array();

            lstMember[n] = lstMember[i].slice(mid, lstMember[i].length);

            totalSize += lstMember[n].length;

            parent[n] = i;

            n++;

          }

        }



        //Preserve this sequence

        for (i = 0; i < namMember.length; i++) {

          rec[i] = 0;

        }

        nrec = 0;



        //List that keeps your results

        //Value of link initial

        // Value of link initial

        for (i = 0; i <= namMember.length; i++) {

          equal[i] = -1;

        }



        cmp1 = lstMember.length - 2;

        cmp2 = lstMember.length - 1;

        head1 = 0;

        head2 = 0;

        numQuestion = 1;

        finishSize = 0;

        finishFlag = 0;

      }



      //&#12522;&#12473;&#12488;&#12398;&#12477;&#12540;&#12488;+++++++++++++++++++++++++++++++++++++++++++

      //flag&#65306;Don't know characters

      // -1&#65306;Chose the left

      // 0&#65306;Tie

      // 1&#65306;Chose the right

      function sortList(flag) {

        var i;

        var str;



        //rec preservation

        if (flag < 0) {

          rec[nrec] = lstMember[cmp1][head1];

          head1++;

          nrec++;

          finishSize++;

          while (equal[rec[nrec - 1]] != -1) {

            rec[nrec] = lstMember[cmp1][head1];

            head1++;

            nrec++;

            finishSize++;

          }

        }

        else if (flag > 0) {

          rec[nrec] = lstMember[cmp2][head2];

          head2++;

          nrec++;

          finishSize++;

          while (equal[rec[nrec - 1]] != -1) {

            rec[nrec] = lstMember[cmp2][head2];

            head2++;

            nrec++;

            finishSize++;

          }

        }

        else {

          rec[nrec] = lstMember[cmp1][head1];

          head1++;

          nrec++;

          finishSize++;

          while (equal[rec[nrec - 1]] != -1) {

            rec[nrec] = lstMember[cmp1][head1];

            head1++;

            nrec++;

            finishSize++;

          }

          equal[rec[nrec - 1]] = lstMember[cmp2][head2];

          rec[nrec] = lstMember[cmp2][head2];

          head2++;

          nrec++;

          finishSize++;

          while (equal[rec[nrec - 1]] != -1) {

            rec[nrec] = lstMember[cmp2][head2];

            head2++;

            nrec++;

            finishSize++;

          }

        }



        //Processing after finishing with one list

        if (head1 < lstMember[cmp1].length && head2 == lstMember[cmp2].length) {

          //List the remainder of cmp2 copies, list cmp1 copies when finished scanning

          while (head1 < lstMember[cmp1].length) {

            rec[nrec] = lstMember[cmp1][head1];

            head1++;

            nrec++;

            finishSize++;

          }

        }

        else if (head1 == lstMember[cmp1].length && head2 < lstMember[cmp2].length) {

          //List the remainder of cmp1 copies, list cmp2 copies when finished scanning

          while (head2 < lstMember[cmp2].length) {

            rec[nrec] = lstMember[cmp2][head2];

            head2++;

            nrec++;

            finishSize++;

          }

        }



        //When it arrives at the end of both lists

        //Update a pro list

        if (head1 == lstMember[cmp1].length && head2 == lstMember[cmp2].length) {

          for (i = 0; i < lstMember[cmp1].length + lstMember[cmp2].length; i++) {

            lstMember[parent[cmp1]][i] = rec[i];

          }

          lstMember.pop();

          lstMember.pop();

          cmp1 = cmp1 - 2;

          cmp2 = cmp2 - 2;

          head1 = 0;

          head2 = 0;



          //Initialize the rec before performing the new comparison

          if (head1 == 0 && head2 == 0) {

            for (i = 0; i < namMember.length; i++) {

              rec[i] = 0;

            }

            nrec = 0;

          }

        }



        if (cmp1 < 0) {



          str = "Question #" + (numQuestion - 1) + "<br>" + Math.floor(finishSize * 100 / totalSize) + " percent completed.";
          document.getElementById("battleNumber").innerHTML = str;

          var elem2 = document.getElementById("myBar");
          var newWidth = elem2.style.width;
          var id2 = setInterval(frame, 10);
          function frame() 
          { 
            newWidth++
            elem2.style.width = newWidth + "%";
            elem2.innerHTML = newWidth  + "%";
            if( isNaN(elem2.style.width) )
            {
              elem2.style.width = 96 + "%";
            elem2.innerHTML = 100  + "%";
              clearInterval(id2);  
            }
           
          }


          showResult();

          finishFlag = 1;

        }

        else {

          showImage();

        }

      }



      //The results+++++++++++++++++++++++++++++++++++++++++++++++

      //&#38918;&#20301;=Rank/Grade/Position/Standing/Status

      //&#21517;&#21069;=Identification term

      function showResult() {

        var ranking = 1;

        var sameRank = 1;

        var str = "";

        var i;



        str += "<table style=\"width:200px; color: black; font-size:18px; line-height:120%; margin-left:auto; margin-right:auto; border:1px solid #000; border-collapse:collapse\" align=\"center\">";

        str += "<tr><td style=\"color:#ffffff; background-color:#c72727; text-align:center;\">rank<\/td><td style=\"color:#ffffff; background-color:#c72727; text-align:center;\">track names<\/td><\/tr>";



        for (i = 0; i < namMember.length; i++) {

          str += "<tr><td style=\"border:1px solid #000; text-align:center; padding-right:5px;\">" + ranking + "<\/td><td style=\"border:1px solid #000; padding-left:5px;\">" + namMember[lstMember[0][i]] + "<\/td><\/tr>";

          if (i < namMember.length - 1) {

            if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {

              sameRank++;

            } else {

              ranking += sameRank;

              sameRank = 1;

            }

          }

        }

        str += "<\/table>";



        document.getElementById("resultField").innerHTML = str;

      }



      //Indicates two elements to compare+++++++++++++++++++++++++++++++++++

      function showImage() 
      {
        
        var counter = 0;
        function move(prePercent, PostPercent) 
        {
          if (counter== 0) 
          {
            
            counter = 1;
            var elem = document.getElementById("myBar");
            console.log(elem.style.width)
            var width2 = parseFloat(elem.style.width) 
            console.log(width2, PostPercent);
            var width = width2;
            var id = setInterval(frame, 25);
            function frame()
            {
              if ( (width >= PostPercent) || isNaN(PostPercent) )
              {
                clearInterval(id);
                counter = 0;
                console.log("executed");
              } 
              else 
              {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "%";
              }
          }
        } 
      }


      var str0 = "Question #" + numQuestion + "<br>" + Math.floor(finishSize * 100 / totalSize) + " percent completed.";
      move(percentPre, Math.floor(finishSize * 100 / totalSize));
      percentPre = Math.floor(finishSize * 100 / totalSize);

        

        var str1 = "" + toNameFace(lstMember[cmp1][head1]);

        var str2 = "" + toNameFace(lstMember[cmp2][head2]);

       
        

        document.getElementById("battleNumber").innerHTML = str0;

        document.getElementById("leftField").innerHTML = str1;

        document.getElementById("rightField").innerHTML = str2;



        numQuestion++;

      }




      //Convert numeric value into a name (emoticon)+++++++++++++++++++++++++++++++

      function toNameFace(n) {

        var str = namMember[n];

        return str;

      }

      initList();

    showImage();
      

    var w = document.getElementById("leftField");
    w.addEventListener('click', function() { 
      if(finishFlag == 0)
      {
      sortList(-1);
      }
    }, false);

    var x = document.getElementsByClassName("middleField");
    x[0].addEventListener('click', function() { 
      if(finishFlag == 0)
      {
      sortList(0);
      }
    }, false);
 
    var y = document.getElementById("rightField");
    y.addEventListener('click', function() { 
      if(finishFlag == 0)
      {
      sortList(1);
      }
    }, false);

    x[1].addEventListener('click', function() { 
      if(finishFlag == 0)
      {
      sortList(0);
      }
    }, false);




    }




    var j = document.getElementById("selectNumber");
    j.addEventListener('change', function() 
    { 

      var elem3 = document.getElementById("myBar");
      elem3.style.width = 0 + "%";
      elem3.innerHTML = ""

      document.getElementById("resultField").innerHTML = "";


      var newArtist = artNames.dataset.artist;
      load(j.value, newArtist); 
    }, false);
    
