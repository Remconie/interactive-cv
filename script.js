let directories = ["personalia", "education", "certificates", "skills", "interests"];
    let personalia = ["name: Remco Nieberg", "date of birth: october 24 1991", "adress: Wilhelmina Druckerstraat 26 1442AW Purmerend", "phone: +31642842052", "mail: remco.nieberg@gmail.com"];
    let education = ["2019: DevOps bootcamp @ITPH Zwolle", "2015-2017: RMA Philosophy @Universiteit van Amsterdam", "2011-2015: BA Wijsbegeerte @Universiteit van Amsterdam", "2004-2010: VWO @Da Vinci College Purmerend"];
    let certificates = ["Professional Scrum Master I (PSM I)", "ISTQB® Certified Tester - Foundation Level", "IREB® Certified Professional for Requirements Engineering Foundation Level"];
    let skills = ["HTML", "CSS", "JavaScript", "TypeScript", "Angular", "Java", "Python", "Dutch (native language)", "English (fluently)"];
    let interests = ["Literature", "Philosophy", "Computer Science", "Programming", "Cycling"];
    let currentPosition = directories;
    let currentPositionPrint = "directories";

  	function checkEnter(event, element) {
  		if (event.keyCode === 13) {
  			printText(element);
  		}
  	}

    function navigate(commandGiven) {
      if (commandGiven === "cd" || commandGiven === "cd ..") {
        currentPosition = directories;
        currentPositionPrint = "directories";
      } else {
        let goTo = commandGiven.substr(3);
        if (directories.includes(goTo) && currentPosition === directories) {
          currentPosition = eval(goTo);
          currentPositionPrint = goTo;
        } else if (currentPosition.includes(goTo) && currentPosition != directories) {
          return "-bash: cd: " + goTo + ": Not a directory";
        } else if (!(currentPosition.includes(goTo)) && !(directories.includes(goTo))) {
          return "-bash: cd: " + goTo + ": No such file or directory";
        }
      }
    }

    function showItems() {
      let list = "<ul>";
      for (i = 0; i < currentPosition.length; i++) {
        list += "<li>" + currentPosition[i] + "</li>";
      }
      list += "</ul>";
      return list;
    }

  	function printText(element) {
      //get command and print it
      let commandGiven = document.getElementById("commands").value;
  		let command = document.createElement("P");
  		command.innerHTML = currentPositionPrint + " $ " + commandGiven;
  		let terminal = document.getElementById("terminal");
  		terminal.insertBefore(command, document.getElementById("inputField"));
      //create element for system output
      let response = document.createElement("P");
      //process command
  		if (commandGiven === "ls") {
  		  response.innerHTML = showItems();
        terminal.insertBefore(response, document.getElementById("inputField"));
  		} else if (commandGiven.startsWith("cd ") || commandGiven === "cd") {
        navigate(commandGiven);
        if (navigate(commandGiven) != null) {
          response.innerHTML = navigate(commandGiven);
          terminal.insertBefore(response, document.getElementById("inputField"));
        }
      } else {
  			response.innerHTML = "-bash: " + commandGiven + ": command not found";
        terminal.insertBefore(response, document.getElementById("inputField"));
  		}
      document.getElementById("prompt").innerHTML = currentPositionPrint;
  		document.getElementById("commands").value = "";
  	}

    function showDetails(subject) {
      if (subject.childNodes.length === 1) {
        let items = eval(subject.id);
        let list = subject.id + "<ul>";
        for (i = 0; i < items.length; i++) {
          list += "<li>" + items[i] + "</li>";
        }
        list += "</ul>";
        subject.innerHTML = list;
        console.log(subject.childNodes);
      } else {
        subject.innerHTML = subject.id;
    }
  }
    
