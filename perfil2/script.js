(function ($) {
  teste = new Array();
  posicao = 0;
  teste[posicao] = new Array();

  $(".fotos figure")
    .each(function (e) {
      if (e <= e + 2) {
        teste[posicao][e] = e;

        if ((e + 1) % 3 == 0) {
          posicao += 1;
          teste[posicao] = new Array();
        }
      }
    })
    .hover(
      function () {
        var $obj = $(this);

        $obj.find("figcaption").stop().animate(
          {
            top: 0,
            left: 0,
          },
          500
        );
      },
      function (e) {
        var $obj = $(this);
        var mouseTop = e.pageY - $obj.offset().top;
        var mouseLeft = e.pageX - $obj.offset().left;
        var indice = $(this).index();

        var posicao_array;

        //for in que captura a posicao do array
        for (var i = 0; i < teste.length; i++) {
          for (var ps = 0; ps < teste[i].length; ps++) {
            if (indice == teste[i][ps]) {
              posicao_array = i;
            }
          }
        }

        if (mouseTop <= 0) {
          for (var i = 0; i <= teste.length; i++) {
            if (i < posicao_array) {
              for (var ps = 0; ps < teste[i].length; ps++) {
                $(".fotos figure:eq(" + teste[i][ps] + ")")
                  .find("figcaption")
                  .css({
                    top: "190px",
                    left: 0,
                  });
              }
            } else {
              $(this).find("figcaption").stop().animate(
                {
                  top: "-190px",
                },
                500
              );

              for (var ps = 0; ps < teste[i].length; ps++) {
                if (teste[i][ps] != indice) {
                  $(".fotos figure:eq(" + teste[i][ps] + ")")
                    .find("figcaption")
                    .css({
                      top: "-190px",
                      left: 0,
                    });
                }
              }
            }
          }
        } else if (mouseTop >= 134) {
          for (var i = 0; i <= teste.length; i++) {
            if (i < posicao_array) {
              for (var ps = 0; ps < teste[i].length; ps++) {
                $(".fotos figure:eq(" + teste[i][ps] + ")")
                  .find("figcaption")
                  .css({
                    top: "190px",
                    left: 0,
                  });
              }
            } else {
              $(this).find("figcaption").stop().animate(
                {
                  top: "190px",
                },
                500
              );

              for (var ps = 0; ps < teste[i].length; ps++) {
                if (teste[i][ps] != indice) {
                  $(".fotos figure:eq(" + teste[i][ps] + ")")
                    .find("figcaption")
                    .css({
                      top: "-190px",
                      left: 0,
                    });
                }
              }
            }
          }
        }

        var key = 0;
        if (mouseLeft <= 0) {
          $(this).find("figcaption").stop().animate(
            {
              top: "0",
              left: "-280px",
            },
            500
          );

          $(".fotos figure")
            .not(":eq(" + indice + ")")
            .find("figcaption")
            .css({
              top: "0",
              left: "280px",
            });
        } else if (mouseLeft >= 177) {
          $(this).find("figcaption").stop().animate(
            {
              top: "0",
              left: "280px",
            },
            500
          );

          $(".fotos figure")
            .not(":eq(" + indice + ")")
            .find("figcaption")
            .css({
              top: "0",
              left: "-287px",
            });
        }
      }
    );

  $(".fotos figure").click(function () {
    if ($(".atv").hasClass("atv")) {
      $(".atv").removeClass("atv");
    }
    var legenda = $(this).find("img").data("legend");

    $(this)
      .find("figcaption")
      .stop()
      .animate(
        {
          top: "-190px",
        },
        "slow"
      )
      .end()
      .addClass("atv");

    $("#galeria-full li")
      .append("<img src='" + $(this).find("img").data("big") + "' />")
      .find("img")
      .css("display", "block")
      .parent()
      .parent()
      .parent()
      .fadeIn();

    if (legenda == "") {
      $("#legenda").hide();
    } else {
      $("#legenda").show().text(legenda);
    }

    $("#atual").text(parseInt($(this).index()) + 1);

    return false;
  });
  $("#fechar").click(function () {
    return fechar();
  });

  $("#prev").click(function () {
    return anterior();
  });

  $("#next").click(function () {
    return proximo();
  });

  $(document).bind("keyup", function (e) {
    var tecla_codigo = e.which;

    switch (tecla_codigo) {
      case 39:
        proximo();
        break;
      case 37:
        anterior();
        break;
      case 27:
        fechar();
        break;
    }
  });

  function fechar() {
    $("#galeria-full").fadeOut(300, function () {
      $("#galeria-full li img").remove();
    });

    return false;
  }

  function anterior() {
    if ($(".atv").prev().size()) {
      var ind = $(".atv").prev().index();
    } else {
      var ind = $(".fotos figure").length - 1;
    }

    var caminho = $(".fotos figure:eq(" + ind + ")")
      .find("img")
      .data("big");
    var legenda = $(".fotos figure:eq(" + ind + ")")
      .find("img")
      .data("legend");

    $("#galeria-full li img").attr("src", caminho).fadeIn("slow");
    $(".atv").removeClass("atv");
    $(".fotos figure:eq(" + ind + ")").addClass("atv");

    //seta o numero da imagem atual para o usuario visualizar
    $("#atual").text(ind + 1);

    if (legenda == "") {
      $("#legenda").fadeOut("slow");
    } else {
      $("#legenda").fadeIn().text(legenda);
    }

    return false;
  }

  function proximo() {
    if ($(".atv").next().size()) {
      var ind = $(".atv").next().index();
    } else {
      var ind = 0;
    }

    var caminho = $(".fotos figure:eq(" + ind + ")")
      .find("img")
      .data("big");
    var legenda = $(".fotos figure:eq(" + ind + ")")
      .find("img")
      .data("legend");

    $("#galeria-full li img").attr("src", caminho).fadeIn("slow");
    $(".atv").removeClass("atv");
    $(".fotos figure:eq(" + ind + ")").addClass("atv");

    //seta o numero da imagem atual para o usuario visualizar
    $("#atual").text(ind + 1);

    if (legenda == "") {
      $("#legenda").fadeOut("slow");
    } else {
      $("#legenda").fadeIn().text(legenda);
    }

    return false;
  }
})(jQuery);
