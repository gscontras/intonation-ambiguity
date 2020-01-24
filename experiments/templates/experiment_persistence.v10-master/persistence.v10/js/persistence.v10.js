var utterance = ["heavy", "tall", "big"]
var context = ["regular","random"]


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
      $(".scenario_condition").html("Cubert the alien works in a factory. His job is to " + exp.scenario + " shipments of boxes. He gets these boxes from a dispenser in the ceiling. You will begin by observing the dispenser in action.");
    }, 
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.context1 = slide({
    name : "context1",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

      present : function() {
          if (exp.scenario == "move") {
                  if (exp.context == "random") {
                    return _.shuffle([
                      ['<img src="../expt-files/images/context1.1.png" class="context_image" alt="Step 1" id="context1.1"></img>',
                      '<img src="../expt-files/images/contextX.2.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context1.3.png" class="context_image" alt="Step 3" id="context1.3"></img>'],
                      ['<img src="../expt-files/images/context2.1.png" class="context_image" alt="Step 1" id="context2.1"></img>',
                      '<img src="../expt-files/images/contextX.2.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context2.3.png" class="context_image" alt="Step 3" id="context2.3"></img>'],
                      ['<img src="../expt-files/images/context3.1.png" class="context_image" alt="Step 1" id="context3.1"></img>',
                      '<img src="../expt-files/images/contextX.2.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context3.3.png" class="context_image" alt="Step 3" id="context3.3"></img>'],
                      ['<img src="../expt-files/images/context4.1.png" class="context_image" alt="Step 1" id="context4.1"></img>',
                      '<img src="../expt-files/images/contextX.2.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context4.3.png" class="context_image" alt="Step 3" id="context4.3"></img>']
                      ])
                  } 
                  else {
                    return _.shuffle([
                      ['<img src="../expt-files/images/context1.1.png" class="context_image" alt="Step 1" id="context1.1"></img>',
                      '<img src="../expt-files/images/contextX.2.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context1.3reg.png" class="context_image" alt="Step 3" id="context1.3reg"></img>'],
                      ['<img src="../expt-files/images/context2.1.png" class="context_image" alt="Step 1" id="context2.1"></img>',
                      '<img src="../expt-files/images/contextX.2.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context2.3reg.png" class="context_image" alt="Step 3" id="context2.3reg"></img>'],
                      ['<img src="../expt-files/images/context3.1.png" class="context_image" alt="Step 1" id="context3.1"></img>',
                      '<img src="../expt-files/images/contextX.2.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context3.3reg.png" class="context_image" alt="Step 3" id="context3.3"></img>'],
                      ['<img src="../expt-files/images/context4.1.png" class="context_image" alt="Step 1" id="context4.1"></img>',
                      '<img src="../expt-files/images/contextX.2.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context4.3reg.png" class="context_image" alt="Step 3" id="context4.3"></img>']
                      ])
                  }
                }
          else {
            if (exp.context == "random") {
                    return _.shuffle([
                      ['<img src="../expt-files/images/context1.1.nodolly.png" class="context_image" alt="Step 1" id="context1.1"></img>',
                      '<img src="../expt-files/images/contextX.2.nodolly.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context1.3.nodolly.png" class="context_image" alt="Step 3" id="context1.3"></img>'],
                      ['<img src="../expt-files/images/context2.1.nodolly.png" class="context_image" alt="Step 1" id="context2.1"></img>',
                      '<img src="../expt-files/images/contextX.2.nodolly.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context2.3.nodolly.png" class="context_image" alt="Step 3" id="context2.3"></img>'],
                      ['<img src="../expt-files/images/context3.1.nodolly.png" class="context_image" alt="Step 1" id="context3.1"></img>',
                      '<img src="../expt-files/images/contextX.2.nodolly.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context3.3.nodolly.png" class="context_image" alt="Step 3" id="context3.3"></img>'],
                      ['<img src="../expt-files/images/context4.1.nodolly.png" class="context_image" alt="Step 1" id="context4.1"></img>',
                      '<img src="../expt-files/images/contextX.2.nodolly.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context4.3.nodolly.png" class="context_image" alt="Step 3" id="context4.3"></img>']
                      ])
                  } 
                  else {
                    return _.shuffle([
                      ['<img src="../expt-files/images/context1.1.nodolly.png" class="context_image" alt="Step 1" id="context1.1"></img>',
                      '<img src="../expt-files/images/contextX.2.nodolly.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context1.3reg.nodolly.png" class="context_image" alt="Step 3" id="context1.3reg"></img>'],
                      ['<img src="../expt-files/images/context2.1.nodolly.png" class="context_image" alt="Step 1" id="context2.1"></img>',
                      '<img src="../expt-files/images/contextX.2.nodolly.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context2.3reg.nodolly.png" class="context_image" alt="Step 3" id="context2.3reg"></img>'],
                      ['<img src="../expt-files/images/context3.1.nodolly.png" class="context_image" alt="Step 1" id="context3.1"></img>',
                      '<img src="../expt-files/images/contextX.2.nodolly.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context3.3reg.nodolly.png" class="context_image" alt="Step 3" id="context3.3"></img>'],
                      ['<img src="../expt-files/images/context4.1.nodolly.png" class="context_image" alt="Step 1" id="context4.1"></img>',
                      '<img src="../expt-files/images/contextX.2.nodolly.png" class="context_image" alt="Step 2" id="context1.2"></img>',
                      '<img src="../expt-files/images/context4.3reg.nodolly.png" class="context_image" alt="Step 3" id="context4.3"></img>']
                      ])
                  }
          }

      }(),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".continue").hide();
      function show_image(image) {
        var pause_time = 1000;
        $("#context").html(image);
        $('.context_image').click(function(){
           $(".context_image").unbind("click");
           show_image(stim.shift());
           setTimeout(function() {
            show_image(stim.shift());
            setTimeout(function() {
              show_image(stim.shift());
              setTimeout(function() {
                $(".continue").show();
              }, pause_time)
            }, pause_time)
           }, pause_time);
        })
      }


      show_image(stim.shift());

    },

    button : function() {
        _stream.apply(this);
    },
  });
  
  slides.instructions2 = slide({
    name : "instructions2",
    start: function() {
      if (exp.scenario == "move") {
      $(".scenario2_condition").html("Now that you have seen the dispenser in action, it is time to answer some questions. After moving a shipment of boxes, Cubert tells his friend, Dot, about the boxes he moved. Your task is to help Dot decide what Cubert meant.");
      }
      else {
       $(".scenario2_condition").html("Now that you have seen the dispenser in action, it is time to answer some questions. After inspecting a shipment of boxes, Cubert tells his friend, Dot, about the boxes he inspected. Your task is to help Dot decide what Cubert meant."); 
      }

    }, 
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.statement = slide({
    name : "statement",
    start: function() {
      $(".utterance_condition").html("\"The boxes were "  + exp.utterance + "!\"");
    },  

    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.multi_slider = slide({
    name : "multi_slider",
    present : _.shuffle([
      "big","heavy","tall"
    ]),
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers

      $(".test_sentence").html("\"The boxes were "  + stim + "!\"");

      this.sentence_types = _.shuffle(["coll","dist"]);
      var sentences = {
        "coll": "The boxes together were "+stim+".",
        "dist": "The boxes each were "+stim+".",
      };

      this.n_sliders = this.sentence_types.length;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }

      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },

    button : function() {
      if (exp.sliderPost.length < this.n_sliders) {
        $(".err").show();
      } else {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },

    init_sliders : function(sentence_types) {
      for (var i=0; i<sentence_types.length; i++) {
        var sentence_type = sentence_types[i];
        utils.make_slider("#slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.sentence_types.length; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "sentence_type" : sentence_type,
          "context" : exp.context,
          "response" : exp.sliderPost[i],
          "utterance" : this.stim,
          "sceanrio" : exp.scenario
        });
      }
    },
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
  exp.context = _.sample(["regular","random"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions1","context1", "instructions2",'multi_slider', 'subj_info', 'thanks'];
  
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