Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
const yearRange = Array.range(1965,2009).reverse();
export const standardDays = Array.range(1,32);
export const monthRange = [{number:1,value:"January"}, {number:2,value:"February"}, {number:3,value:"March"},
    {number:4,value:"April"}, {number:5,value:"May"}, {number:6,value:"June"},
    {number:7,value:"July"}, {number:8,value:"August"}, {number:9,value:"September"},
    {number:10,value:"October"}, {number:11,value:"November"}, {number:12,value:"December"}];
export const calculateDays = (year, month) => {
    console.log(year, month);
    if(["January", "March", "May", "July", "August", "October", "December"].indexOf(month)>-1){
        console.log("yes");
        return Array.range(1,32)
    }
    if(["April","June", "September", "November"].indexOf(month)>-1){
        return Array.range(1,31)
    }
    if(year%4 === 0){
        return Array.range(1,29)
    }
    return Array.range(1,30)


}
export default yearRange;