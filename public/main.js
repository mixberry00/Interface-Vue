var app = new Vue({
    el: '#schedule',
    data: {
        times: ['8:30-10:00','10:30-12:00', '14:00-15:30', '16:00-17:30', '18:00-19:30', '20:00-21:30'],
        days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        newTeacher: '',
        teachers: [],
        tchr: 'tchr',
        ts: 'ts',
        td: 'td',
        newAgeL: '', newAgeH: '',
        Ages: [{L: '8', H: '12'}],
        tName: '',
        tchName: '',
        tAgeL: '',
        tAgeH: '',
        ttime: '',
        tday: '',
        tcab: '',
        chday: '',
        srchAge: '',
        Tasks: [],
        options:{
            rows: 42,
            cols: 1
        },
        grid: []
    },
    methods:{
        addTable(tName, tchName, tAgeL, tAgeH, ttime, tday, tcab)
        {
            var j = 0;
            while(tchName != this.teachers[j]) j++;

            var k = 0;
            while(tday != this.days[k]) k++;

            var i = 0; 
            while(ttime != this.times[i]) i++;
            i += k * 6;

            var myRow = document.getElementById("td" + i +','+ j);
            
            if(myRow.innerText != "")
                return 0;

            myRow.innerText = tName + '\r\n' + 'Возраст:' + '\r\n' + 'от ' + tAgeL + " " + 'до ' + tAgeH + ' лет' + '\r\n' + 'Кабинет:' + '\r\n' + tcab;

            myRow.style.visibility = "visible";
            
            return 1;
        },
        showwindowch(){
            this.closewindow();
            this.$refs.change.style.display = "block";
            this.$refs.ag.style.display = "block";
        },
        showwindowtsk(){
            this.closewindow();
            this.$refs.change.style.display = "block";
            this.$refs.tsk.style.display = "block";
        },
        showwindowchk(){
            this.closewindow();
            this.$refs.change.style.display = "block";
            this.$refs.dds.style.display = "block";
        },
        showwindowtch(){
            this.closewindow();
            this.$refs.change.style.display = "block";
            this.$refs.tchr.style.display = "block";
        },
        showwindowsrch(){
            this.closewindow();
            this.$refs.change.style.display = "block";
            this.$refs.srch.style.display = "block";
        },
        closewindow(){
            this.$refs.change.style.display = "none";
            this.$refs.ag.style.display = "none";
            this.$refs.tsk.style.display = "none";
            this.$refs.dds.style.display = "none";
            this.$refs.tchr.style.display = "none";
            this.$refs.srch.style.display = "none";
            this.$refs.tem.style.display = "none";
            this.$refs.aem.style.display = "none";
            this.$refs.dem.style.display = "none";
            this.$refs.tchem.style.display = "none";
            this.$refs.dsh.style.display = "none";
            this.$refs.srchsh.style.display = "none";
            this.$refs.srchem.style.display = "none";
            this.$refs.tbusy.style.display = "none";    
        },
        addTask(tName, tchName, tAgeL, tAgeH, ttime, tday, tcab){
            var busy = true;
            for(var i = 0; i < this.Tasks.length; i++)
                if(this.Tasks[i].TimeDay.Time == ttime && this.Tasks[i].TimeDay.Time == ttime && this.Tasks[i].Teacher == tchName)
                    busy = false;
            if(!busy)
            {
                this.$refs.tbusy.style.display = "block";  
            }
            else{
                let numbers = '0123456789';
                let flag = true;
                for(let i = 0; i < tName.length && flag; i++)
                    for(let j = 0; j < numbers.length && flag; j++)
                        if(tName[i] == numbers[j])
                            flag = false;
                let flag2 = tName != "" && tchName != "" && tAgeL != "" && tAgeH != "" && ttime != "" && tday != "" && tcab != "";
                if(!flag)
                {
                    this.$refs.tn.style.display = "block";
                    this.$refs.tne.style.border = "solid red 1px";

                }
                else
                {
                    this.$refs.tn.style.display = "none";
                    this.$refs.tne.style.border = "solid pink 1px";
                }
                if(!flag2)
                    this.$refs.tem.style.display = "block";
                if(flag && flag2)
                {
                    this.addTable(tName, tchName, tAgeL, tAgeH, ttime, tday, tcab);
                    this.tName = ""; this.tchName = ""; this.tAgeL = ""; this.tAgeH="";
                    this.ttime=""; this.tday=""; this.tcab="";
                    this.Tasks.push({Task:tName, Teacher:tchName, L:tAgeL, H:tAgeH, TimeDay:{Time:ttime, Day:tday}, Cab:tcab});                    
                    this.$refs.tem.style.display = "none";                    
                    this.closewindow();
                }
            }
        },
        AddAges()
        {
            if(this.newAgeL == "" || this.newAgeH == "")
                this.$refs.aem.style.display = "block";
            else{
            this.Ages.push({L:this.newAgeL, H:this.newAgeH});
            this.$refs.aem.style.display = "none";
            this.closewindow();
            }
        },
        CheckDay()
        {
            if(this.chday == "")
                this.$refs.dem.style.display = "block";
            else
            {
                this.closewindow();
                this.$refs.change.style.display = "block";
                this.$refs.dsh.style.display = "block";
            }
        },
        AddTeacher()
        {
            let numbers = '0123456789';
            let flag = true;
            for(let i = 0; i < this.newTeacher.length && flag; i++)
                for(let j = 0; j < numbers.length && flag; j++)
                    if(this.newTeacher[i] == numbers[j])
                        flag = false;
            if(!flag)
            {
                this.$refs.tchn.style.display = "block";
                this.$refs.tchne.style.border = "solid red 1px"
            }
            else
            {
                this.$refs.tchn.style.display = "none";
                this.$refs.tchne.style.border = "solid pink 1px";
            }
            if(this.newTeacher == "")
                this.$refs.tchem.style.display = "block";
            else if(flag){
            this.teachers.push(this.newTeacher);
            this.$refs.tchem.style.display = "none";
            this.options.cols++;
            this.newTeacher = '';
            this.closewindow();
            }
        },
        Search()
        {
            if(this.srchAge == "")
                this.$refs.srchem.style.display = "block";
            else
            {
                this.closewindow();
                this.$refs.change.style.display = "block";
                this.$refs.srchsh.style.display = "block";
            }
        }  
    }
});