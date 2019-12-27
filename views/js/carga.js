        /*Agregar evento al input file*/
        document.getElementById('archivo')
            .addEventListener('change', leerArchivo, false);     
        function leerArchivo(e) 
        {
          var archivo = e.target.files[0];                           
          if (!archivo) 
          {
              return;
          }
          var lector = new FileReader();
          lector.onload = function(e)
          {
              var contenido = e.target.result;
              //mostrarContenido(contenido);

              var data = new FormData();
              data.append('data', contenido); 
              //parseo(contenido);         
              var lecciones = carga.parse(contenido);
              enviarPeticion(lecciones);
              //enviarPeticion(contenido);
          };
            lector.readAsText(archivo);
        }

        function mostrarContenido(contenido) 
        {
            parseo(contenido);
          enviarPeticion();
        }  

      var http_request = false;

      function enviarPeticion(data) {

          var url = '/cargaMasiva';
          http_request = false;

          if (window.XMLHttpRequest) { 
              http_request = new XMLHttpRequest();
              if (http_request.overrideMimeType) {
                  http_request.overrideMimeType('text/xml');
                  // Ver nota sobre esta linea al final
              }
          } else if (window.ActiveXObject) { // IE
              try {
                  http_request = new ActiveXObject("Msxml2.XMLHTTP");
              } catch (e) {
                  try {
                      http_request = new ActiveXObject("Microsoft.XMLHTTP");
                  } catch (e) {}
              }
          }

          if (!http_request) {
              alert('Falla :( No es posible crear una instancia XMLHTTP');
              return false;
          }


          http_request.onreadystatechange = alertContents;
          http_request.open('POST', url, true);
          http_request.setRequestHeader("Content-type", "application/json");
          http_request.setRequestHeader("dataType", "json");
          http_request.send(JSON.stringify(data));
          //http_request.send(data);

      }

      function alertContents() {

          if (http_request.readyState == 4) {
              if (http_request.status == 200) {
                  alert(http_request.responseText);
              } else {
                  alert('Hubo problemas con la petición.');
              }
          }
      }    
      
      function parseo(cadena)
      {
          var lecciones = carga.parse(cadena);
      }