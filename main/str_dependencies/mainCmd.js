StarTerminal.Util.Execute("echo", function (Value, Callback) {
    StarTerminal.Terminal.Output(Value, "normal");
    Callback();
}, ["Displays a text given by (arg1)", "[echo (arg1: any)]", "(arg1: any)"]);
StarTerminal.Util.Execute("clear", function (Value, Callback) {
    StarTerminal.Util.ArgumentSearch(
        Value,
        0,
        function (ReturnValue) {
            if (ReturnValue.toLowerCase() === "cmd") {
                StarTerminal.CommandPosition = 0;
                StarTerminal.CommandTable = [];
                Callback();
            } else if (ReturnValue.toLowerCase() === "log") {
                StarTerminal.Terminal.ClearLogger();
                Callback();
            } else if (ReturnValue.toLowerCase() === "all") {
                StarTerminal.CommandPosition = 0;
                StarTerminal.CommandTable = [];
                StarTerminal.Terminal.ClearLogger();
                Callback();
            } else {
                StarTerminal.Terminal.Output("clear: Invalid argument, proceeding to use (log) arg");
                setTimeout(function () {
                    StarTerminal.Terminal.ClearLogger();
                    Callback();
                }, 1000);
            }
        },
        function () {
            StarTerminal.Terminal.ClearLogger();
            Callback();
        }
    );
}, ["Clears a property in the terminal, depending on (arg1)", "[clear (arg1: Option)]", "(cmd: Command history | log: Logger history | all: All of the above)"]);
StarTerminal.Util.Execute("echodelay", function (Value, Callback) {    
    StarTerminal.Util.ArgumentSearch(Value, 0, function(ReturnValue){
        let Text = Value.substring(ReturnValue.length + 1)
        let Timer = parseFloat(ReturnValue)
        
        if (Number.isNaN(Timer) === false) {
            StarTerminal.Terminal.OutputDelay(Text, "normal", "", Timer * 1000, Callback);
        } else {
            StarTerminal.Terminal.Output("echodelay: arg1 is NaN (Not a Number), insert any number");
            Callback();
        }
    }, function(){
        StarTerminal.Terminal.Output("echodelay: arg1 is empty, insert any number");
        Callback();
    })
}, ["Displays an output given by (arg2), but waits at a given time by (arg1)", "[echodelay (arg1: number) (arg2: any)]", "(arg1: number) (arg2: any)"]);
StarTerminal.Util.Execute("echoloop", function (Value, Callback) {
    StarTerminal.Util.ArgumentSearch(Value, 0, function(ReturnValue) {
        let Text = Value.substring(ReturnValue.length + 1)
        let LoopAmount = parseFloat(ReturnValue).toFixed(1)
        
        if (Number.isNaN(LoopAmount) === false) {
            let Time1 = performance.now()
            for (let Index = 0; Index < LoopAmount; Index++) {
                StarTerminal.Terminal.Output(Text)
            }
            let Time2 = performance.now()
            
            StarTerminal.Terminal.Break()
            StarTerminal.Terminal.Output(`Time elapsed: ${(Time2 - Time1).toFixed(5)}ms`)
            Callback()
        } else {
            StarTerminal.Terminal.Output("echoloop: arg1 is NaN (Not a Number), insert any number");
        }
    }, function() {
        StarTerminal.Terminal.Output("echoloop: arg1 is empty, insert any number");
        Callback()
    })
}, ["Displays an output given by (arg2), but it repeats till (arg1)", "[echoloop (arg1: positive int) (arg2: any)]", "(arg1: positive int) (arg2: any)"]);
StarTerminal.Util.Execute("openurl", function (Value, Callback) {
    StarTerminal.Util.ArgumentSearch(
        Value,
        0,
        function (ReturnValue) {
            window.open(ReturnValue, "_blank");
            StarTerminal.Terminal.Output(`openurl: opened <a href="${ReturnValue}" target="_blank">${ReturnValue}</a>`);
            Callback();
        },
        function () {
            StarTerminal.Terminal.Output("openurl: arg1 is empty, insert any link");
            Callback();
        }
    );
}, ["Opens a specific url depending on (arg1)", "[openurl (arg1: URL / link)]", "(arg1: URL / link)"]);
StarTerminal.Util.Execute("aesthetics", function (Value, Callback) {
    StarTerminal.Util.ArgumentSearch(
        Value,
        0,
        function (Aesthetics) {
            if (Aesthetics.toLowerCase() === "list") {
                StarTerminal.Terminal.Output("==| Aesthetics options |==", "normal", "#00ff00")
                StarTerminal.Terminal.Break()
                
                StarTerminal.Terminal.Output("crt_effect: Toggles those faint lines in your terminal that's usually on most CRT monitors", "normal", StarTerminal.ColorMenu.OptionHighlight);
                StarTerminal.Terminal.Output("===|> crt_effect: 'true' for enabling it");
                StarTerminal.Terminal.Output("===|> crt_effect: 'false' for disabling it");
                StarTerminal.Terminal.Break()
                
                StarTerminal.Terminal.Output("caret_style: Switches the terminal caret (the blocky thingy that's on your input)", "normal", StarTerminal.ColorMenu.OptionHighlight);
                StarTerminal.Terminal.Output( "===|> caret_style: 'block' for blocky input (currently by default)");
                StarTerminal.Terminal.Output("===|> caret_style: 'bar' for the usual input");
                StarTerminal.Terminal.Break()
                
                Callback()
            } else if (Aesthetics.toLowerCase() === "crt_effect") {
                StarTerminal.Util.ArgumentSearch(
                    Value,
                    1,
                    function (Boolean) {
                        if (Boolean.toLowerCase() === "true") {
                            StarTerminal.Cosmetics.ToggleCRT(true);
                            StarTerminal.Terminal.Output("aesthetics: crtEffect is set to true", "normal", StarTerminal.ColorMenu.Success);
                            Callback();
                        } else if (Boolean.toLowerCase() === "false") {
                            StarTerminal.Cosmetics.ToggleCRT(false);
                            StarTerminal.Terminal.Output("aesthetics: crtEffect is set to false", "normal", StarTerminal.ColorMenu.Success);
                            Callback();
                        } else {
                            StarTerminal.Terminal.Output("aesthetics: arg2 is an invalid boolean, insert true / false");
                            Callback();
                        }
                    },
                    function () {
                        StarTerminal.Terminal.Output("aesthetics: arg2 is empty, insert true / false");
                        Callback();
                    }
                );
            } else if (Aesthetics.toLowerCase() === "caret_style") {
                StarTerminal.Util.ArgumentSearch(
                    Value,
                    1,
                    function (Boolean) {
                        if (Boolean.toLowerCase() === "block") {
                            StarTerminal.Cosmetics.SwitchCaret("block");
                            StarTerminal.Terminal.Output("aesthetics: caretStyle is set to block", "normal", StarTerminal.ColorMenu.Success);
                            Callback();
                        } else if (Boolean.toLowerCase() === "bar") {
                            StarTerminal.Cosmetics.SwitchCaret("bar");
                            StarTerminal.Terminal.Output("aesthetics: crtEffect is set to bar", "normal", StarTerminal.ColorMenu.Success);
                            Callback();
                        } else {
                            StarTerminal.Terminal.Output("aesthetics: arg2 is an invalid boolean, insert true / false");
                            Callback();
                        }
                    },
                    function () {
                        StarTerminal.Terminal.Output("aesthetics: arg2 is empty, insert true / false");
                        Callback();
                    }
                );
            } else {
                StarTerminal.Terminal.Output("aesthetics: arg1 is an invalid option, insert any options");
                Callback();
            }
        },
        function () {
            StarTerminal.Terminal.Output("aesthetics: arg1 is empty, insert any options");
            Callback();
        }
    );
}, ["Changes / toggles on your terminal customization by (arg1) and the condition by (arg2), use [aesthetics list] for more info", "[aesthetics (arg1: option) (arg2: condition)]", "(arg1: option) (arg2: condition)"]);
StarTerminal.Util.Execute("fetch", function (Value, Callback) {
    StarTerminal.Terminal.Output("==| SYSTEM INFORMATION (but limited) |==", "normal", "#FF00AE");
    StarTerminal.Terminal.Break();

    StarTerminal.Terminal.Output("- CPU:", "normal", "#00ff00");
    StarTerminal.Terminal.Output(`== Logical cores: ${navigator.hardwareConcurrency} core(s)`); // A fancy way to say "threads"
    StarTerminal.Terminal.Break();

    StarTerminal.Terminal.Output("- RAM:", "normal", "#00ff00");
    if (performance.memory) {
        StarTerminal.Terminal.Output(
            `== Usage: ${(performance.memory.totalJSHeapSize / 1024 ** 3).toFixed(2)} GB / ${(performance.memory.jsHeapSizeLimit / 1024 ** 3).toFixed(2)} GB`
        );
    } else {
        StarTerminal.Terminal.Output(
            `== Usage: Unsupported`
        );
    }
    StarTerminal.Terminal.Break();

    StarTerminal.Terminal.Output("- Screen:", "normal", "#00ff00");
    StarTerminal.Terminal.Output(`== Resolution: ${screen.width}x${screen.height}`);
    StarTerminal.Terminal.Output(`== Color depth: ${screen.colorDepth}-bit`);
    StarTerminal.Terminal.Break();
    
    StarTerminal.Terminal.Output("", "normal")
    Callback();
}, ["Fetches your current hardware / software info (extremely limited)", "[fetch]", ""]);
StarTerminal.Util.Execute("stfetch", function (Value, Callback) {
    StarTerminal.Terminal.FetchOutput()
    Callback();
}, ["Outputs your StarTerminal info and other properties", "[stfetch]", ""]);
StarTerminal.Util.Execute("kill", function (Value, Callback) {
    StarTerminal.Terminal.Kill(1000);
    Callback();
}, ["Kills your current session", "[kill]", ""]);
StarTerminal.Util.Execute("debug", function(Value, Callback) {
    StarTerminal.Util.ArgumentSearch(Value, 0, function(ReturnValue) {
        if (ReturnValue.toLowerCase() === "list") {
            StarTerminal.Terminal.Output("== Debug list ==", "normal", "#00ff00")
            StarTerminal.Terminal.Break()
            
            StarTerminal.Terminal.Output("terminal_lock:", "normal", StarTerminal.ColorMenu.OptionHighlight)
            StarTerminal.Terminal.Output("==> Function: Locks the terminal, until any key is pressed", "normal", "")
            StarTerminal.Terminal.Output("==> Usage: [debug terminal_lock]", "normal", "")
            StarTerminal.Terminal.Break()
            
            StarTerminal.Terminal.Output("progress:", "normal", StarTerminal.ColorMenu.OptionHighlight)
            StarTerminal.Terminal.Output("==> Function: Creates a progress bar", "normal", "")
            StarTerminal.Terminal.Output("==> Usage: [debug progress (arg1: number, duration in seconds)]", "normal", "")
            StarTerminal.Terminal.Break()
            
            Callback()
        } else if (ReturnValue.toLowerCase() === "terminal_lock") {
            StarTerminal.Terminal.LockTerminal(Callback)
        } else if (ReturnValue.toLowerCase() === "progress") {
            StarTerminal.Util.ArgumentSearch(Value, 1, function(ReturnValue1) {
                let Duration = parseFloat(ReturnValue1)
                
                if (Number.isNaN(Duration) !== true) {
                    StarTerminal.Terminal.CreateProgressbar([0, 100, 0], Duration, 20, Callback)
                } else {
                    StarTerminal.Terminal.Output("progress: (arg1) is NaN (Not a Number), insert any number")
                }
            }, function() {
                StarTerminal.Terminal.CreateProgressbar([0, 100, 0], 5, 20, Callback)
            })
        } else {
            StarTerminal.Terminal.Output("debug: arg1 is an invalid option, enter [debug list] for valid options")
            Callback()
        }
    }, function() {
        StarTerminal.Terminal.Output("debug: arg1 is empty, enter [debug list] for valid options")
        Callback()
    })
}, ["Allows you to test stuff depending on (arg1), enter [debug list] for more", "[debug (arg1: option)]", "(arg1: option)"])
StarTerminal.Util.Execute("customize", function(Value, Callback) {
    let HTML = document.getElementsByTagName("html")[0]
    
    StarTerminal.Util.ArgumentSearch(Value, 0, function(ReturnValue) {
        if (ReturnValue.toLowerCase() === "help") {
            StarTerminal.Terminal.Output("== CUSTOMIZATION HELPER ==", "normal", StarTerminal.ColorMenu.HelpTitle_Global)
            StarTerminal.Terminal.Break()
            
            StarTerminal.Terminal.Output("(arg1)", "normal", StarTerminal.ColorMenu.OptionHighlight)
            StarTerminal.Terminal.Output("== Function: This is for the background color of your terminal")
            StarTerminal.Terminal.Output("== Example: rgb(255, 255, 255) | #ffffff")
            StarTerminal.Terminal.Break()
            
            StarTerminal.Terminal.Output("(arg2)", "normal", StarTerminal.ColorMenu.OptionHighlight)
            StarTerminal.Terminal.Output("== Function: This is for the foreground (Text color) color of your terminal")
            StarTerminal.Terminal.Output("== Example: rgb(255, 255, 255) | #ffffff")
            StarTerminal.Terminal.Break()
            
            StarTerminal.Terminal.Output("NOTE: You can use [blank] in one of the arguments to prevent the terminal from accidental styling")
            StarTerminal.Terminal.Break()
            
            Callback()
        } else if (ReturnValue.toLowerCase() === "blank") {
            Callback()
        } else if (ReturnValue.toLowerCase() === "reset") {
            HTML.style.setProperty("--INDENTITY-ST_BG-COLOR", StarTerminal.ConstantStyles.BG_Color)
            HTML.style.setProperty("--INDENTITY-ST_FG-COLOR", StarTerminal.ConstantStyles.FG_Color)
            StarTerminal.Terminal.Output("customize: Successfully resetted styles to default values")
            StarTerminal.Terminal.Output(`== Background color: ${StarTerminal.ConstantStyles.BG_Color}`)
            StarTerminal.Terminal.Output(`== Color: ${StarTerminal.ConstantStyles.FG_Color}`)
            
            Callback()
        } else {
            if (CSS.supports("background-color", ReturnValue) === true) {
                StarTerminal.Terminal.Output(`Background color: ${ReturnValue}`)
                HTML.style.setProperty("--INDENTITY-ST_BG-COLOR", ReturnValue)
                Callback()
            } else {
                StarTerminal.Terminal.Output("customize: (arg1) is invalid, type in [customize help] for more instructions")
                Callback()
            }
        }
    }, function() {
        StarTerminal.Terminal.Output("customize: (arg1) is empty, type in [customize help] for more instructions")
        Callback()
    })
    StarTerminal.Util.ArgumentSearch(Value, 1, function(ReturnValue1) {
        if (CSS.supports("color", ReturnValue1) === true) {
            StarTerminal.Terminal.Output(`Foreground color: ${ReturnValue1}`)
            HTML.style.setProperty("--INDENTITY-ST_FG-COLOR", ReturnValue1)
            StarTerminal.Terminal.Break()
            Callback()
        } else if (ReturnValue.toLowerCase() === "blank") {
            StarTerminal.Terminal.Break()
            Callback()
        } else {
            StarTerminal.Terminal.Output("customize: (arg2) is invalid, type in [customize help] for more instructions")
            Callback()
        }
    }, function() {
        StarTerminal.Terminal.Break()
        Callback()
    })
}, ["Changes the look of your terminal, type in [customize help] for more instructions", "[customize (arg1: color) (arg2: color)]", "(arg1: color) (arg2: color)"])