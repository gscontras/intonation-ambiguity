var utterance = ["heavy", "tall", "big"]
var context = ["regular","random"]


function show_image_2(image) {
    $("#machine").html(image);
    };  

function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions1 = slide({
    name : "instructions1",

    start: function() {
      $(".scenario_condition").html("Cubert the alien works in a factory. His job is to " + exp.scenario + " shipments of boxes. He gets these boxes from a dispenser in the ceiling.");
      if (exp.scenario == "move") {
        image = '<img src="../expt-files/images/context1.1.png" class="context_image" id="context1.1"></img>'
      }
      else {
        image = '<img src="../expt-files/images/context1.1.nodolly.png" class="context_image" id="context1.1"></img>'
      }
      show_image_2(image);

    }, 
    button : function() {
        exp.go()
    }
  });


  
  slides.instructions2 = slide({
      name : "instructions2",
      start: function() {
        if (exp.scenario == "move") {
      $(".scenario2_condition").html("After moving a shipment of boxes, Cubert tells his friend, Dot, about the boxes he moved. Your task is to help Dot decide what Cubert meant.");
      }
      else {
       $(".scenario2_condition").html("After inspecting a shipment of boxes, Cubert tells his friend, Dot, about the boxes he inspected. Your task is to help Dot decide what Cubert meant."); 
      }
      }, 
      button : function() {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    });

  slides.trial = slide({
      name : "trial",



      present: _.shuffle([ {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "each ",
                "utterance": "big"
                             },
                             {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "together ",
                "utterance": "big"
                             },
                             {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "",
                "utterance": "big"
                             },
                             {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "each ",
                "utterance": "heavy"
                             },
                             {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "together ",
                "utterance": "heavy"
                             },
                             {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "",
                "utterance": "heavy"
                             },
                             {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "each ",
                "utterance": "tall"
                             },
                             {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "together ",
                "utterance": "tall"
                             },
                             {
                "coll_list":                                        
                [{w:  60  , h:  60 }, {w:  60, h:  60  }, {w:  60 , h:  60  }, {w:  60  , h:  60  }, {w:  60  , h:  60 }],
                "dist_list":
                [{w:  0  , h:  0  }, {w:  60  , h:  120  }, {w:  0 , h:  0  }, {w:  60  , h:  120  }, {w:  0  , h:  0  }],
                "disambiguator": "",
                "utterance": "tall"
                             },                                        
      ]),
      

      present_handle: function(stim) {

        $(".test_sentence").html("\"The boxes "+stim.disambiguator+"were "+stim.utterance+"!\"");


        //var papers = [];
        var colors = _.shuffle(["#00f", "#f00", "#00f", "#f00"]);
        var coords = [{x: 0, y:0}, {x: 5, y:60}, {x: 0, y:120}, {x: 2, y:180}, {x: 3, y:240}];
        var sets = [stim.coll_list,stim.dist_list];
        //var list_label = stim.label;
        var order = _.shuffle(["coll_list", "dist_list"]);
        for (var i=0; i<2; i++) {
          var version = order[i]
          var label = 'set' + (i+1);
          var paper = new Raphael(document.getElementById(label), 100, 300);
          var set = stim[version]
          for (var j=0; j<5; j++) {
            var dims = set[j];
            var box = paper.rect(coords[j].x, coords[j].y, dims.w, dims.h).attr({fill: colors[i], stroke: '#000', 'stroke-width': 2});
          }
          $("#" + label).hover(function(){
                              $(this).fadeTo(10,0.5);   
                              },
                              function(){
                              $(this).fadeTo(10,1);       
                              });
          $('#' + label).click(function(choice) {
            return function() {
              $(".set").unbind("click");
              $(".set").empty();
              exp.data_trials.push({
                "choice": choice,
              //  "stim": stim.toString(),
                "utterance": stim.utterance,
                "scenario": exp.scenario,
                //"story": exp.story,
                "disambiguator": stim.disambiguator,
              });
              setTimeout(function(){
              _stream.apply(_s);
            }, 1000);
            }
          }(version));
        }
      },



      button : function() {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      } //use exp.go() if and only if there is no "present" data.
    });

 
  





  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          //"condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.scenario = _.sample(["move","inspect"]);
  exp.story = _.sample(["dist","coll"]);
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  exp.structure=["i0", "instructions1", "instructions2", "trial",'subj_info', 'thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}