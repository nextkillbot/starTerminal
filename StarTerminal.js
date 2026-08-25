let StarTerminal = {}

StarTerminal.Configuration = {
    COMPATIBILITY_MODE: true,
    EXTENSIONS: true,
    
    EXTENSIONS_LIST: {
        TITLE: " (☆ Nyaa~)"
    },
    
    State: {
        Version: "1.0",
        Release: "alpha"
    }, TerminalInfo: {
        Padding: "4px",
        Colors: {
            Success: "#00ff00",
            Error: "#ff0000",
        },
        Messages: {
            InvalidCommand: "command not found",
        },
        PrettySyntax: "C:\\StarTerminal.js> ",
    }, ScriptInfo: {
        Styler: {
            StartLogger: "~★ ",
            EndLogger: ""
        }, Logger: {
            RoundOffTo: 5
        }
    },
    KillWrapper: {
        Color1: "transparent",
        Color2: "#000000aa",
        Height: "1.5px",
        Blur: "1.5px",
        KillText: "StarTerminal has ended its process, you may restart or close your browser."
    },
    CRTWrapper: {
        Enabled: true,
        AllowGlow: true,
        GlowValue: "0 0 0.5em",
        Color1: "transparent",
        Color2: "#00000050",
        Height: "2.5px",
    }
}

// CONSTANT FUNCTION
function ST_Output(Text, Mode) {
    switch (Mode) {
        case "log":
        case "l":
            console.log(`${StarTerminal.Configuration.ScriptInfo.Styler.StartLogger}${Text}${StarTerminal.Configuration.ScriptInfo.Styler.EndLogger}`)
            
            break;
            
        case "warn":
        case "w":
            console.warn(`${StarTerminal.Configuration.ScriptInfo.Styler.StartLogger}${Text}${StarTerminal.Configuration.ScriptInfo.Styler.EndLogger}`)
            
            break;
            
        case "error":
        case "err":
            console.error(`${StarTerminal.Configuration.ScriptInfo.Styler.StartLogger}${Text}${StarTerminal.Configuration.ScriptInfo.Styler.EndLogger}`)
            
            break;
        
        default:
            console.log(`${StarTerminal.Configuration.ScriptInfo.Styler.StartLogger}${Text}${StarTerminal.Configuration.ScriptInfo.Styler.EndLogger}`)
            
            break;
    }
} function GenerateSequence(Length) {
    let TableInitializer = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("")
    let ReturnObject = ""
    
    for (let Index = 0; Index < (Length ?? 5); Index++) {
        let Randomizer = Math.floor(Math.random() * TableInitializer.length)
        ReturnObject += TableInitializer[Randomizer]
    }
    return ReturnObject
}

// CONSTANT VALUES
StarTerminal.BitKey = GenerateSequence(10)

// VARIABLES
StarTerminal.InitializerCaller = 0

StarTerminal.CommandCount = -1
StarTerminal.CommandPosition = 0
StarTerminal.CommandTable = []

// COMMAND TABLE
StarTerminal.Commands = {}
StarTerminal.CommandRegistries = 0

// OUTSIDE THE INIT & WORKER
if (StarTerminal.InitializerCaller === 0) {
    ST_Output(`StarTerminal: Script has been called\nTo activate, add 'StarTerminal.Init()' inside your <script> tag`, "warn")
}

// INITIALIZER
StarTerminal.Init = function(ObjectName, ObjectType, ObjectIndex) {
    if (ObjectName === undefined || ObjectName === null) {ObjectName = "body"}
    if (ObjectType === undefined || ObjectType === null) {ObjectType = "tag"}
    if (ObjectIndex === undefined || ObjectIndex === null) {ObjectIndex = 0}
    
    try {
        if (StarTerminal.InitializerCaller === 0) {
            StarTerminal.InitializerCaller++
            
            let Time1 = performance.now();
        
            StarTerminal.Terminal.ImportCommand("str_dependencies/mainCmd.js")
            
            function ParseParent() {
                switch (ObjectType) {
                    case "class":
                    case "c":
                        return document.getElementsByClassName(ObjectName)[ObjectIndex]

                        break;
                    case "id":
                    case "i":
                        return document.querySelectorAll(`#${ObjectName}`)[ObjectIndex]

                        break;
                    case "tag":
                    case "t":
                        return document.getElementsByTagName(ObjectName)[ObjectIndex]

                        break;
                }
            }
            let Body = document.getElementsByTagName("body")[0]

            if (StarTerminal.Configuration.COMPATIBILITY_MODE === true) {
                Object.assign(Body.style, {
                    padding: "0px",
                    margin: "0px",
                })
            }

            if (StarTerminal.Configuration.EXTENSIONS === true) {
                let Title = document.getElementsByTagName("title")[0]
                Title.innerHTML += StarTerminal.Configuration.EXTENSIONS_LIST.TITLE
            }

            let ST_Wrapper = document.createElement("div");
            ST_Wrapper.classList.add(`ST_Wrapper-${StarTerminal.BitKey}`)
            Object.assign(ST_Wrapper.style, {
                padding: StarTerminal.Configuration.TerminalInfo.Padding,
                overflowY: "auto",
                scrollbarColor: `${window.getComputedStyle(Body).color} transparent`,

                width: "100%",
                height: "100%",

                boxSizing: "border-box",
            })
            ParseParent().appendChild(ST_Wrapper)

            let ST_CMDLogger = document.createElement("div");
            ST_CMDLogger.classList.add(`ST_CMDLogger-${StarTerminal.BitKey}`)
            Object.assign(ST_CMDLogger.style, {
                width: "100%",
                height: "max-content",

                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start"
            })
            ST_Wrapper.appendChild(ST_CMDLogger)

            let ST_CMDWrapper = document.createElement("div");
            ST_CMDWrapper.classList.add(`ST_CMDWrapper-${StarTerminal.BitKey}`)
            Object.assign(ST_CMDWrapper.style, {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                height: "max-content",
            })
            ST_Wrapper.appendChild(ST_CMDWrapper)

            let ST_Syntax = document.createElement("span");
            ST_Syntax.classList.add(`ST_Syntax-${StarTerminal.BitKey}`)
            ST_Syntax.innerHTML = StarTerminal.Configuration.TerminalInfo.PrettySyntax
            ST_CMDWrapper.appendChild(ST_Syntax)

            let ST_CMDInput = document.createElement("span");
            ST_CMDInput.classList.add(`ST_CMDInput-${StarTerminal.BitKey}`)
            ST_CMDInput.setAttribute("spellcheck", "false")
            ST_CMDInput.setAttribute("contenteditable", "true")
            ST_CMDInput.addEventListener("keydown", function(Event){
                if (Event.key === "Enter") {
                    Event.preventDefault()
                    if (ST_CMDInput.textContent.trim().length !== 0 && ST_CMDInput.textContent !== "") {
                        let Command = ST_CMDInput.textContent.trimStart().split(" ")[0].trimEnd()
                        let Arguments = ST_CMDInput.textContent.substring(Command.length + 1).replace(/\s+/g, " ").trim()
                        let Flagger = false

                        StarTerminal.CommandCount++
                        StarTerminal.CommandTable.push(ST_CMDInput.textContent)
                        StarTerminal.CommandPosition = StarTerminal.CommandTable.length

                        StarTerminal.Terminal.ToggleCooldown(false)
                        StarTerminal.Terminal.Output(`${StarTerminal.Configuration.TerminalInfo.PrettySyntax}${ST_CMDInput.textContent.replaceAll(">", "&gt;").replaceAll("<", "&lt;")}<br>${Command.replaceAll(">", "&gt;").replaceAll("<", "&lt;")}: ${StarTerminal.Configuration.TerminalInfo.Messages.InvalidCommand}`, "internal")

                        for (let Index = 0; Index < Object.keys(StarTerminal.Commands).length; Index++) {
                            if (Command.toLowerCase() === StarTerminal.Commands[`cmd${Index}`].Name && Flagger === false) {
                                let Output = document.getElementsByClassName(`ST_TermOutput_Internal-${StarTerminal.BitKey}`)[StarTerminal.CommandCount]
                                Output.innerHTML = Output.innerHTML.replaceAll(`<br>${Command}: ${StarTerminal.Configuration.TerminalInfo.Messages.InvalidCommand}`, "")

                                Flagger = true

                                StarTerminal.Commands[`cmd${Index}`].ExecutionPoint(Arguments, function(){
                                    StarTerminal.Terminal.ToggleCooldown(true)
                                    ST_Wrapper.scrollTo({
                                        top: ST_Wrapper.scrollHeight,
                                        behavior: "instant"
                                    })
                                    Flagger = false
                                    ST_CMDInput.textContent = ""
                                })
                            }
                        }
                        if (Flagger === false) {
                            StarTerminal.Terminal.ToggleCooldown(true)
                            ST_CMDInput.focus()
                            ST_CMDInput.textContent = ""
                        }
                    } else {
                        StarTerminal.Terminal.Output(`${StarTerminal.Configuration.TerminalInfo.PrettySyntax}`, "null")
                    }
                } if (Event.key === "ArrowUp") {
                    Event.preventDefault()

                    if (StarTerminal.CommandTable.length === 0) {
                        StarTerminal.CommandPosition = 0
                        ST_CMDInput.textContent = ""
                    } else {
                        if (StarTerminal.CommandPosition === 0) {
                            StarTerminal.CommandPosition = 0
                            ST_CMDInput.textContent = StarTerminal.CommandTable[0]
                        } else {
                            StarTerminal.CommandPosition--
                            ST_CMDInput.textContent = StarTerminal.CommandTable[StarTerminal.CommandPosition]
                        }
                    }

                    setTimeout(function(){
                        ST_CMDInput.focus()

                        let NewRange = document.createRange()
                        NewRange.selectNodeContents(ST_CMDInput)
                        NewRange.collapse(false)

                        let NewSelection = window.getSelection()
                        NewSelection.removeAllRanges()
                        NewSelection.addRange(NewRange)
                    }, 1)
                } if (Event.key === "ArrowDown") {
                    Event.preventDefault()

                    if (StarTerminal.CommandTable.length === 0) {
                        StarTerminal.CommandPosition = 0
                        ST_CMDInput.textContent = ""
                    } else {
                        if (StarTerminal.CommandPosition >= StarTerminal.CommandTable.length - 1) {
                            StarTerminal.CommandPosition = StarTerminal.CommandTable.length
                            ST_CMDInput.textContent = ""
                        } else {
                            StarTerminal.CommandPosition++
                            ST_CMDInput.textContent = StarTerminal.CommandTable[StarTerminal.CommandPosition]
                        }
                    }

                    setTimeout(function(){
                        ST_CMDInput.focus()

                        let NewRange = document.createRange()
                        NewRange.selectNodeContents(ST_CMDInput)
                        NewRange.collapse(false)

                        let NewSelection = window.getSelection()
                        NewSelection.removeAllRanges()
                        NewSelection.addRange(NewRange)
                    }, 1)
                }
            })
            Object.assign(ST_CMDInput.style, {
                backgroundColor: "transparent",
                color: window.getComputedStyle(Body).getPropertyValue("color"),
                fontFamily: window.getComputedStyle(Body).getPropertyValue("font-family"),
                fontSize: window.getComputedStyle(Body).getPropertyValue("font-size"),
                border: "none",

                wordBreak: "break-all",

                caretShape: "block",
                caretColor: window.getComputedStyle(Body).color,

                padding: "0px",
                marginLeft: "1ch",

                outline: "none",
                flexGrow: "1",
            })
            ST_CMDWrapper.appendChild(ST_CMDInput)

            let ST_CRTWrapper = document.createElement("div")
            ST_CRTWrapper.classList.add(`ST_CRTWrapper-${StarTerminal.BitKey}`)
            ParseParent().appendChild(ST_CRTWrapper)
            Object.assign(ST_CRTWrapper.style, {
                backgroundImage: `linear-gradient(to bottom, ${StarTerminal.Configuration.CRTWrapper.Color1}, ${StarTerminal.Configuration.CRTWrapper.Color1}, ${StarTerminal.Configuration.CRTWrapper.Color2}, ${StarTerminal.Configuration.CRTWrapper.Color2})`,
                backgroundSize: `100% ${StarTerminal.Configuration.CRTWrapper.Height}, cover`,

                position: "absolute",
                top: "0px",
                pointerEvents: "none",

                width: "100%",
                height: "100%",
                
                zIndex: "7"
            })
            
            StarTerminal.Terminal.Output(`StarTerminal v${StarTerminal.Configuration.State.Version} | ${StarTerminal.Configuration.State.Release} release`, "defined")
            StarTerminal.Terminal.Output("Enter 'help' for more info", "defined")
            StarTerminal.Terminal.Break()
            
            ST_Wrapper.addEventListener("click", function(Event){
                Event.preventDefault()
                ST_CMDInput.focus()
            })
            
            if (StarTerminal.Configuration.CRTWrapper.Enabled === true) {            
                ST_CRTWrapper.style.setProperty("display", "flex")
            } else if (StarTerminal.Configuration.CRTWrapper.Enabled === false) {
                ST_CRTWrapper.style.setProperty("display", "none")
            }

            if (StarTerminal.Configuration.CRTWrapper.AllowGlow === true) {
                ST_Wrapper.style.setProperty("text-shadow", StarTerminal.Configuration.CRTWrapper.GlowValue)
            }

            let Time2 = performance.now();
            ST_Output(`StarTerminal: All assets has been initialized with the assets needed.\nKey: ${StarTerminal.BitKey} (use [StarTerminal.BitKey])\nInit time: ${(Time2 - Time1).toFixed(StarTerminal.Configuration.ScriptInfo.Logger.RoundOffTo)}ms (${StarTerminal.Configuration.ScriptInfo.Logger.RoundOffTo} decimal place)`, "log")
        } else {
            ST_Output(`StarTerminal: Cannot intialize needed assets.\nStarTerminal.Init() is called more than 1 time`, "error")
        }
    } catch (Error) {
        ST_Output(`StarTerminal: Cannot intialize needed assets.\n${Error}`, "error")
    }
}

// WORKER FUNCTIONS
StarTerminal.Cosmetics = {}
StarTerminal.Cosmetics.ToggleCRT = function(IsThere) {
    let ST_CRTWrapper = document.getElementsByClassName(`ST_CRTWrapper-${StarTerminal.BitKey}`)[0]
    
    if (IsThere === true) {
        StarTerminal.Configuration.CRTWrapper.Enabled = true
        ST_CRTWrapper.style.setProperty("display", "flex")
    } else if (IsThere === false) {
        StarTerminal.Configuration.CRTWrapper.Enabled = false
        ST_CRTWrapper.style.setProperty("display", "none")
    }
}
StarTerminal.Cosmetics.SwitchCaret = function(CaretOptions) {
    if (CaretOptions === null || CaretOptions === undefined) {CaretOptions = ""}
    
    let ST_CMDInput = document.getElementsByClassName(`ST_CMDInput-${StarTerminal.BitKey}`)[0]
    
    switch (CaretOptions) {
        case "block":
            ST_CMDInput.style.setProperty("caret-shape", "block")
            break;
        case "bar":
            ST_CMDInput.style.setProperty("caret-shape", "bar")
            break;
    }
}

StarTerminal.Terminal = {}
StarTerminal.Terminal.FetchOutput = function() {
    function NewLogger(Text, Color, Parent) {
        let TextObject = document.createElement("span")
        let Break = document.createElement("br")
        TextObject.textContent = Text
        TextObject.style.setProperty("color", Color ?? "#ffffff")
        
        Parent.appendChild(TextObject)
        TextObject.appendChild(Break)
    }
    function NewBreak(Parent) {
        let TextObject = document.createElement("br")
        
        Parent.appendChild(TextObject)
    }
    
    let Time1 = performance.now()
    
    let CMDLogger = document.getElementsByClassName(`ST_CMDLogger-${StarTerminal.BitKey}`)[0]
    
    let FetchWrapper = document.createElement("div")
    Object.assign(FetchWrapper.style, {
        display: "flex",
        flexDirection: "row",
        
        justifyContent: "flex-start",
        alignItems: "flex-start",
        
        overflowX: "auto",
        wordBreak: "break-all",
        
        width: "100%",
        height: "max-content",
    })
    CMDLogger.appendChild(FetchWrapper)
    
    let Icon = document.createElement("img")
    Icon.setAttribute("src", "str_assets/images/icon.png")
    Object.assign(Icon.style, {
        paddingRight: "0.5em",
        
        verticalAlign: "middle",
        
        height: "7.5em",
    })
    FetchWrapper.appendChild(Icon)
    
    let Info = document.createElement("div")
    Object.assign(Info.style, {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        
        paddingLeft: "0.5em",
        
        width: "max-content",
        height: "100%",
    })
    
    let Time2 = performance.now()
    NewLogger(`StarTerminal.js v${StarTerminal.Configuration.State.Version} | ${StarTerminal.Configuration.State.Release} release`, "#00ff00", Info)
    NewBreak(Info)
    NewLogger(`== Fetch time: ${(Time2 - Time1)}ms`, "", Info)
    NewLogger(`== Current browser (raw data): ${navigator.userAgent}`, "", Info)
    NewBreak(Info)
    NewLogger(`That's all, since I've got limited info :)`, "", Info)
    
    FetchWrapper.appendChild(Info)
    
    StarTerminal.Terminal.Break()
}
StarTerminal.Terminal.ToggleCooldown = function(IsInputVisible) {
    if (IsInputVisible === null || IsInputVisible === undefined) {IsInputVisible = true}
    
    let CMDWrapper = document.getElementsByClassName(`ST_CMDWrapper-${StarTerminal.BitKey}`)[0]
    
    if (IsInputVisible === true) {
        CMDWrapper.style.setProperty("display", "flex")
    } else if (IsInputVisible === false) {
        CMDWrapper.style.setProperty("display", "none")
    }
}
StarTerminal.Terminal.Output = function(Text, Mode, Color) {
    let Wrapper = document.getElementsByClassName(`ST_Wrapper-${StarTerminal.BitKey}`)[0]
    let CMDLogger = document.getElementsByClassName(`ST_CMDLogger-${StarTerminal.BitKey}`)[0]
    let Output = document.createElement("span") 
    Object.assign(Output.style, {      
        color: Color ?? window.getComputedStyle(document.body).color,
        
        wordBreak: "break-all",
        
        width: "100%",
        height: "max-content",
        
        zIndex: "5"
    })
    
    CMDLogger.appendChild(Output)
    Output.innerHTML = `${Text}<br>`
    
    switch (Mode) {
        case "normal":
        case "n":
            Output.classList.add(`ST_TermOutput-${StarTerminal.BitKey}`)
            
            break;
            
        case "internal":
        case "int":
            Output.classList.add(`ST_TermOutput_Internal-${StarTerminal.BitKey}`)
            break;
            
        case "defined":
        case "d":
            Output.classList.add(`ST_TermOutput_Defined-${StarTerminal.BitKey}`)
            
            
            break;
            
        case "null":
        case "n":
            Output.classList.add(`ST_TermOutput_Null-${StarTerminal.BitKey}`)
            
            
            break;
            
        default:
            Output.classList.add(`ST_TermOutput-${StarTerminal.BitKey}`)
            
            
            break;
    }
}
StarTerminal.Terminal.OutputDelay = function(Text, Mode, Color, Delay, Execute) {
    let Wrapper = document.getElementsByClassName(`ST_Wrapper-${StarTerminal.BitKey}`)[0]
    let CMDLogger = document.getElementsByClassName(`ST_CMDLogger-${StarTerminal.BitKey}`)[0]
    let Output = document.createElement("span")
    Object.assign(Output.style, {
        color: Color ?? window.getComputedStyle(document.body).color,
        
        wordBreak: "break-all",
        
        width: "100%",
        height: "max-content",
        
        zIndex: "5"
    })
    
    Output.innerHTML = `${Text}<br>`
    
    switch (Mode) {
        case "normal":
        case "n":
            Output.classList.add(`ST_TermOutput-${StarTerminal.BitKey}`)
            
            setTimeout(function(){
                CMDLogger.appendChild(Output)
                
                Wrapper.scrollTo({
                    top: Wrapper.scrollHeight,
                    behavior: "instant"
                })
                
                Execute()
            }, Delay ?? 0)
            
            break;
            
        case "internal":
        case "int":
            Output.classList.add(`ST_TermOutput_Internal-${StarTerminal.BitKey}`)
            
            setTimeout(function(){
                CMDLogger.appendChild(Output)
                
                Wrapper.scrollTo({
                    top: Wrapper.scrollHeight,
                    behavior: "instant"
                })
                
                Execute()
            }, Delay ?? 0)
            
            break;
            
        case "defined":
        case "d":
            Output.classList.add(`ST_TermOutput_Defined-${StarTerminal.BitKey}`)
            
            setTimeout(function(){
                CMDLogger.appendChild(Output)
                
                Wrapper.scrollTo({
                    top: Wrapper.scrollHeight,
                    behavior: "instant"
                })
                
                Execute()
            }, Delay ?? 0)
            
            break;
            
        case "null":
        case "n":
            Output.classList.add(`ST_TermOutput_Null-${StarTerminal.BitKey}`)
            
            setTimeout(function(){
                CMDLogger.appendChild(Output)
                
                Wrapper.scrollTo({
                    top: Wrapper.scrollHeight,
                    behavior: "instant"
                })
                
                Execute()
            }, Delay ?? 0)
            
            break;
            
        default:
            Output.classList.add(`ST_TermOutput-${StarTerminal.BitKey}`)
            
            setTimeout(function(){
                CMDLogger.appendChild(Output)
                
                Wrapper.scrollTo({
                    top: Wrapper.scrollHeight,
                    behavior: "instant"
                })
                
                Execute()
            }, Delay ?? 0)
            
            break;
    }
}
StarTerminal.Terminal.Break = function() {
    let CMDLogger = document.getElementsByClassName(`ST_CMDLogger-${StarTerminal.BitKey}`)[0]
    let Output = document.createElement("span")
    Output.classList.add(`ST_TermOutput_Break-${StarTerminal.BitKey}`)
    
    CMDLogger.appendChild(Output)
    Output.innerHTML = `<br>`
}
StarTerminal.Terminal.ImportCommand = function(Path) {
    try {
        let Importer = document.createElement("script")
        Importer.setAttribute("src", Path)

        document.head.appendChild(Importer)
        
        ST_Output(`StarTerminal: Script has been successfully imported.`, "log")
    } catch (Error) {
        ST_Output(`StarTerminal: Script cannot be imported.\n${Error}`, "error")
    }
}
StarTerminal.Terminal.ClearLogger = function() {
    StarTerminal.CommandCount = -1
    
    setTimeout(function(){
        let Logger = document.getElementsByClassName(`ST_CMDLogger-${StarTerminal.BitKey}`)[0]
        Logger.innerHTML = ""
    }, 1)
}
StarTerminal.Terminal.Kill = function(Delay) {
    let Body = document.body
    
    let ST_CMDInput = document.getElementsByClassName(`ST_CMDInput-${StarTerminal.BitKey}`)[0]
    let ST_CMDSyntax = document.getElementsByClassName(`ST_Syntax-${StarTerminal.BitKey}`)[0]
    
    ST_CMDSyntax.parentNode.removeChild(ST_CMDSyntax)
    ST_CMDInput.parentNode.removeChild(ST_CMDInput)
    
    setTimeout(function(){
        let ST_KillWrapper = document.createElement("div")
        Object.assign(ST_KillWrapper.style, {
            backgroundImage: `linear-gradient(to bottom, ${StarTerminal.Configuration.KillWrapper.Color1}, ${StarTerminal.Configuration.KillWrapper.Color1}, ${StarTerminal.Configuration.KillWrapper.Color2}, ${StarTerminal.Configuration.KillWrapper.Color2})`,
            backgroundSize: `100% ${StarTerminal.Configuration.KillWrapper.Height}, cover`,
            backdropFilter: `blur(${StarTerminal.Configuration.KillWrapper.Blur})`,
            
            position: "absolute",
            
            zIndex: "10",
            
            width: "100vw",
            height: "100vh",
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        })
        Body.appendChild(ST_KillWrapper)
        
        let ST_KillMessage = document.createElement("div")
        Object.assign(ST_KillMessage.style, {
            backgroundColor: "transparent",
            border: `1px solid ${window.getComputedStyle(Body).color}`,
            textShadow: "0 0 0.5em",
            boxShadow: "0 0 0.25em, inset 0 0 0.25em",
            
            padding: "4px 8px",
            
            width: "42.5vw",
            height: "22.5vh",
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        })
        ST_KillMessage.innerHTML = `<span style="font-size: 3vh; text-align: center; width: 75%;">${StarTerminal.Configuration.KillWrapper.KillText}</span>`
        ST_KillWrapper.appendChild(ST_KillMessage)
        
    }, Delay ?? 0)
}

StarTerminal.Util = {}
StarTerminal.Util.Execute = function(Command, Execute) {    
    let CommandRegistry = {
        Name: Command,
        ExecutionPoint: Execute
    }
    StarTerminal.Commands[`cmd${StarTerminal.CommandRegistries}`] = CommandRegistry
    
    StarTerminal.CommandRegistries++
}
StarTerminal.Util.ArgumentSearch = function(ArgumentValue, Index, ExecuteAtPresent, ExecuteAtAbsent) {
    if (Index === undefined || Index === null) {Index = 0}
    
    let ArgumentSelection = ArgumentValue.split(" ")[Index] ?? ""
    if (ArgumentSelection !== "") {
        if (ArgumentSelection.trim().length !== 0 && ArgumentSelection !== "") {
            ExecuteAtPresent(ArgumentSelection)
        }
    } else {
        ExecuteAtAbsent()
    }
}