var myApp = angular.module("captorAngularDisplay", ['captorAngularElements', 'toastr', 'ui.router', 'ui.bootstrap','ui.tree']);
myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/basicTextControls');
    $stateProvider
        .state('basicTextControls', {
            url: '/basicTextControls',
            templateUrl: './views/basicTextControls.html'
        })
        .state('dropdownControls', {
            url: '/dropdownControls',
            templateUrl: './views/dropdownControls.html',
            controller: 'dropdownControls'
        })
        .state('tinyMCEControls', {
            url: '/tinyMCEControls',
            templateUrl: './views/tinyMCEControls.html',
            controller: 'tinyMCEControls'
        })
        .state('datepickerControls', {
            url: '/datetimeControls',
            templateUrl: './views/datepickerControls.html',
            controller: 'datepickerControls'
        })
        .state('otherControls', {
            url: '/otherControls',
            templateUrl: './views/otherControls.html',
            controller: 'otherCtrls'
        })
        .state('uiTreeControls',{
            url: '/uiTreeControls',
            templateUrl: './views/uiTree.html',
            controller: 'uiTreeControls'
        });
    }]);

myApp.controller("homectrl", function ($scope, toastr,$timeout,$sce) {

        var self = this;
            this.example2 = [{
            "id": "M",
            "val": "Male"
        },{
            "id": "F",
            "val": "Female"
        }];
        this.singleSelectVals={};
        this.dummyFunc = function(){
            console.log("dummyFunc");
        }
         self.onSubmit = function (frmCtrl) {
          alert('submitted');
      };
        self.isShow = false;
        $timeout(function(){
            self.isShow = true;
        },1000);
        
        this.cellNumber = "1234567895";
        this.num1 = "5556669879";
        this.abc = "abc";
        $scope.formvalid = true;
        $scope.abc = "parker";
        this.values = {};
        this.values.abc = "david minion";
        this.values.ssn2 = "111444656";
        this.values.phone2 = "5556669879";
        this.submitFunc = function(){
            console.log("submit func");
            //alert("submit func");
        }
    })
    .controller('tinyMCEControls', function ($scope, toastr,$sce,$timeout) {
        var self = this;
        self.tinyText = "jfjhgfjhgfhjgfjhfgfff";
        self.tinyText2 = "hhh";
        self.displayToastr = true;
        this.submitFunc = function(){
            console.log("submit func");
            //alert("submit func");
        }
    })
    .controller('dropdownControls', function ($scope, toastr) {
        this.submitFunc = function(){
            console.log("submit func");
            alert("submit func");
            //alert("submit func");
        }
        this.sample=function(){
            console.log("on blur");
        }
        this.placeH = "Select val"
    this.myCustomModifier=function(){
        console.log("my custom");
    }   
    
        this.stringArrayInput = ["Emil", "Tobias", "Linus"];
    
        this.singleSelectInput = [{
            "id": "M",
            "val": "Male"
        },{
            "id": "F",
            "val": "Female"
        }];
        this.multiSelectInput = [ {
            "Value": "135",
            "Description": "135 Piru"
        }, {
            "Value": "1700",
            "Description": "1700 Block Piru (West Koast)"
        }, {
            "Value": "21IE",
            "Description": "21st Inglewood Elite"
        }, {
            "Value": "59B",
            "Description": "59 Brims"
        }, {
            "Value": "AGM",
            "Description": "A-Gang Mafia"
        }, {
            "Value": "AAG",
            "Description": "Almighty Army Gangstas"
        }, {
            "Value": "ABBA",
            "Description": "Almighty Blood Bishop Army"
        }, {
            "Value": "ABSVN",
            "Description": "Almighty Blood Stone Villain Nation"
        }, {
            "Value": "AGB",
            "Description": "Almighty Gangsta Bloods"
        }, {
            "Value": "AGS",
            "Description": "Almighty Gangster Shooters"
        }, {
            "Value": "ARB",
            "Description": "Almighty Redline Bloods"
        }, {
            "Value": "ARG",
            "Description": "Almighty Renegade Gangstas"
        }, {
            "Value": "ABMG",
            "Description": "Amighty Blood Money Gangsters"
        }, {
            "Value": "BLH",
            "Description": "Bell Havens"
        }, {
            "Value": "BADG",
            "Description": "Black and Deadly Gangsters"
        }, {
            "Value": "BBG",
            "Description": "Black Bully Gangsters"
        }, {
            "Value": "BDG",
            "Description": "Black Desperado Gangsters"
        }, {
            "Value": "BGA",
            "Description": "Black Gangster Alliance"
        }, {
            "Value": "BGG",
            "Description": "Black Grown Gangsters"
        }, {
            "Value": "BHL",
            "Description": "Black Hand Lanes"
        }, {
            "Value": "BHG",
            "Description": "Black Hood Gangsters"
        }, {
            "Value": "BLL",
            "Description": "Black Liberation Lanes"
        }, {
            "Value": "BMG",
            "Description": "Black Money Gangster"
        }, {
            "Value": "BOG",
            "Description": "Black Outlaw Gangsters"
        }, {
            "Value": "BRGA",
            "Description": "Black Revolutionary Gangsters"
        }, {
            "Value": "BRG",
            "Description": "Black Row Gangsters"
        }, {
            "Value": "BSG",
            "Description": "Black Star Gangsters"
        }, {
            "Value": "BSGG",
            "Description": "Black Stone Gorilla Gangsters"
        }, {
            "Value": "BMBO",
            "Description": "Blood Money Bosses"
        }, {
            "Value": "BMB",
            "Description": "Blood Money Brims"
        }, {
            "Value": "BMl",
            "Description": "Blood Money lanes"
        }, {
            "Value": "BHB",
            "Description": "Bloodhound Brim"
        }, {
            "Value": "BHBG5",
            "Description": "Bloodhound Brims (G5)"
        }, {
            "Value": "BMM",
            "Description": "Boss Money Millers"
        }, {
            "Value": "BSMM",
            "Description": "Bossy Money Millers"
        }, {
            "Value": "BHGS",
            "Description": "Bounty Hunter Ghost Shadows"
        }, {
            "Value": "BTH",
            "Description": "Bounty Hunters"
        }, {
            "Value": "BHAL",
            "Description": "Bounty Hunters Ace Line"
        }, {
            "Value": "BHBB",
            "Description": "Bounty Hunters Block Boys"
        }, {
            "Value": "BHFIL",
            "Description": "Bounty Hunters Five Line"
        }, {
            "Value": "BHFL",
            "Description": "Bounty Hunters Four Line"
        }, {
            "Value": "BCB",
            "Description": "Brick City Brims"
        }, {
            "Value": "CPP",
            "Description": "Campanella Park Piru"
        }, {
            "Value": "CBP",
            "Description": "Cedar Block Piru"
        }, {
            "Value": "DEW",
            "Description": "Darkside Elite Warriors"
        }, {
            "Value": "DMG",
            "Description": "Desperado Miller Gangsters"
        }, {
            "Value": "DCL",
            "Description": "Deuce Line"
        }, {
            "Value": "DNGS",
            "Description": "Double Nine Gang Sity"
        }, {
            "Value": "DNGN",
            "Description": "Double Nine Gangreen"
        }, {
            "Value": "DNG",
            "Description": "Double Nine Gangsters"
        }, {
            "Value": "DNGSD",
            "Description": "Double Nine Good Syndicate"
        }, {
            "Value": "DBNG",
            "Description": "Double Nine Guerillaz"
        }, {
            "Value": "DLNG",
            "Description": "Double Nine Gunnerz"
        }, {
            "Value": "DNGM",
            "Description": "Double Nine Gunsmoke"
        }, {
            "Value": "DND",
            "Description": "Doule Nine Divas"
        }, {
            "Value": "EBMR",
            "Description": "East B-Bop Miller Renegades"
        }, {
            "Value": "ECBH",
            "Description": "East Coast Bounty Hunters"
        }, {
            "Value": "ECPI",
            "Description": "East Compton Piru"
        }, {
            "Value": "EHB",
            "Description": "East Homicide Brims"
        }, {
            "Value": "EKGL",
            "Description": "East Koast Gangsta Lanes"
        }, {
            "Value": "EML",
            "Description": "East Milla Lanes"
        }, {
            "Value": "EMG",
            "Description": "East Miller Gangsters"
        }, {
            "Value": "EMR",
            "Description": "East Miller Ryders"
        }, {
            "Value": "ESHB",
            "Description": "East Side Homicide Brim"
        }, {
            "Value": "ESP",
            "Description": "East Side Piru"
        }, {
            "Value": "ETL",
            "Description": "East Thug Lanes"
        }, {
            "Value": "EAMI",
            "Description": "Elite Assassin Milla"
        }, {
            "Value": "EAM",
            "Description": "Elite Assassin Millers"
        }, {
            "Value": "EGB",
            "Description": "Elite Gangster Bloods"
        }, {
            "Value": "FML",
            "Description": "Fast Money Lanes"
        }, {
            "Value": "FSFB",
            "Description": "Four Six Four Brims"
        }, {
            "Value": "FMA",
            "Description": "Frontline Miller Army"
        }, {
            "Value": "FTB",
            "Description": "Fruit Town Brims"
        }, {
            "Value": "FTP",
            "Description": "Fruit Town Piru"
        }, {
            "Value": "GMB",
            "Description": "Gangster Miller Bloods"
        }, {
            "Value": "GSG",
            "Description": "Gorilla Stone Gang"
        }, {
            "Value": "GSM",
            "Description": "Gorilla Stone Mafia"
        }, {
            "Value": "GSR",
            "Description": "Gorilla Stone Ryders"
        }, {
            "Value": "GDL",
            "Description": "Grave Digga Lanes"
        }, {
            "Value": "GKB",
            "Description": "G-Shine/Gangster Killa Bloods"
        }, {
            "Value": "HSB",
            "Description": "Hit Squad Brim"
        }, {
            "Value": "IKM",
            "Description": "Ice Kold Millers"
        }, {
            "Value": "IOM",
            "Description": "Immortal Outlaw Millers"
        }, {
            "Value": "ISGG",
            "Description": "Imperial Stone Gorilla Gangsters"
        }, {
            "Value": "IEA",
            "Description": "Inglewood Elite Army"
        }, {
            "Value": "IEF",
            "Description": "Inglewood Elite Family"
        }, {
            "Value": "IES",
            "Description": "Inglewood Elite Shooters"
        }, {
            "Value": "IFB",
            "Description": "Inglewood Family Brigade"
        }, {
            "Value": "IFG",
            "Description": "Inglewood Family Gangster"
        }, {
            "Value": "IFS",
            "Description": "Inglewood Family Shooters"
        }, {
            "Value": "IIDI",
            "Description": "Inglewood Illtown (Double I)"
        }, {
            "Value": "IFM",
            "Description": "Inglwood Family Mobsters"
        }, {
            "Value": "IMG",
            "Description": "Insane Mob Gang"
        }, {
            "Value": "KMG",
            "Description": "Kleanup Miller Gunners"
        }, {
            "Value": "LPP",
            "Description": "Leuders Park Piru"
        }, {
            "Value": "LTB",
            "Description": "Lot Boys"
        }, {
            "Value": "LRB",
            "Description": "Low Rider Brim"
        }, {
            "Value": "LRBI",
            "Description": "Low Rider Brims (Impala)"
        }, {
            "Value": "LMG",
            "Description": "Loyal Miller Gangsters"
        }, {
            "Value": "MBBI",
            "Description": "Mac Balla Brims (Immaculate Baller Brims/Maybach)"
        }, {
            "Value": "MBB",
            "Description": "Mack Baller Brim"
        }, {
            "Value": "MHBR",
            "Description": "Mad Hatta Brims (Range Rover)"
        }, {
            "Value": "MGB",
            "Description": "Milla Gangsta Bloods"
        }, {
            "Value": "MDS",
            "Description": "Miller Dynasty Soldiers"
        }, {
            "Value": "MGGB",
            "Description": "Miller Gangster Bloods"
        }, {
            "Value": "MTG",
            "Description": "Miller Time Gangsters"
        }, {
            "Value": "MBP",
            "Description": "Mob Piru"
        }, {
            "Value": "MMB",
            "Description": "Moneyline Miller Bosses"
        }, {
            "Value": "MMD",
            "Description": "Murderous Mad Dogs"
        }, {
            "Value": "NMG",
            "Description": "Neighborhood Miller Gang"
        }, {
            "Value": "NYIG",
            "Description": "New York Imperial Gangsters"
        }, {
            "Value": "NDB",
            "Description": "Nine Deuce Bishops"
        }, {
            "Value": "NTG",
            "Description": "Nine Trey Gangsters"
        }, {
            "Value": "NOL",
            "Description": "No Line"
        }, {
            "Value": "NGSG",
            "Description": "Notorious Gorilla Stone Gangsters"
        }, {
            "Value": "NML",
            "Description": "Notorious Murder Lanes"
        }, {
            "Value": "ORT",
            "Description": "Omega Roosters"
        }, {
            "Value": "OETG",
            "Description": "One Eight Trey Gangsters"
        }, {
            "Value": "RHM",
            "Description": "Red Hand Millers"
        }, {
            "Value": "RLG",
            "Description": "Red Lane Gorillas"
        }, {
            "Value": "RMBS",
            "Description": "Red Milla Bangas"
        }, {
            "Value": "RMB",
            "Description": "Red Miller Bangerz"
        }, {
            "Value": "RSGM",
            "Description": "Red Stone Gorilla Mafia"
        }, {
            "Value": "REM",
            "Description": "Redbone Millers"
        }, {
            "Value": "R20",
            "Description": "Rolling 20s"
        }, {
            "Value": "SMM",
            "Description": "Sex Money Murder"
        }, {
            "Value": "SSTB",
            "Description": "Six Six Two Bishops"
        }, {
            "Value": "SSTMP",
            "Description": "Six Six Two Mob Piru"
        }, {
            "Value": "SGL",
            "Description": "SRG Lanes"
        }, {
            "Value": "TMM",
            "Description": "Touch Money Millers"
        }, {
            "Value": "TUFB",
            "Description": "Trauma Unit Family Bloodz"
        }, {
            "Value": "TYL",
            "Description": "Tray Line"
        }, {
            "Value": "TTP",
            "Description": "Tree Top Piru"
        }, {
            "Value": "TTR",
            "Description": "Tree Top Roosters"
        }, {
            "Value": "UBL",
            "Description": "United Blood Lanes"
        }, {
            "Value": "UGSN",
            "Description": "Untouchable Gorilla Stone Nation"
        }, {
            "Value": "VGBCB",
            "Description": "Valentine Gangsters Brick City Brim"
        }, {
            "Value": "VNGR",
            "Description": "Van Ness Gangsta Brims"
        }, {
            "Value": "VNGB",
            "Description": "Van Ness Gangster Brims"
        }, {
            "Value": "WSP",
            "Description": "West Side Piru"
        }, {
            "Value": "WPL",
            "Description": "Wolf Pack Lanes"
        }];

    })
    .controller('datepickerControls', function ($scope) {
            this.time = new Date();
            this.time.setHours( 14 );
            this.time.setMinutes( 0 );
            var self = this;
            this.selected = moment('03/11/2017 12:30');
            this.selected2 = null;
            this.minDate = new Date();
            this.maxDate = new Date();
            this.minTime = new Date(0, 0, 0, Math.max(1, this.time.getHours() - 2), 0, 0, 0);
            this.todayDate = '03/06/2017';
            this.abc = "Select Date";
            this.submitFunc = function(){
                alert("submit func");
            }

            this.dtOptions = {
                startingDay: 0,
                showWeeks: false,
                formatDay: 'd',
                minDate: this.minDate
            }

        })
    .controller('otherCtrls', function ($scope) {
        this.toggleVal = "true";
        this.checkVal = true;
        this.pillVal = true;
        this.radioVal = ['male', 'female', 'alien'];
        this.model = {};
        this.radioSelect = '';
        this.submitFunc = function(){
            console.log("submit func");
            //alert("submit func");
        }
    })
    .controller('uiTreeControls', function ($scope) {
        this.data = [{
              'id': 1,
              'title': 'node1',
              'nodes': [{
                'id': 11,
                'title': 'node1.1',
                'nodes': [{
                  'id': 111,
                  'title': 'node1.1.1',
                  'nodes': []
                }]
              }, {
                'id': 12,
                'title': 'node1.2',
                'nodes': []
              }]
            }, {
              'id': 2,
              'title': 'node2',
              'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
              'nodes': [{
                'id': 21,
                'title': 'node2.1',
                'nodes': []
              }, {
                'id': 22,
                'title': 'node2.2',
                'nodes': []
              }]
            }, {
              'id': 3,
              'title': 'node3',
              'nodes': [{
                'id': 31,
                'title': 'node3.1',
                'nodes': []
              }]
            }];
    });
