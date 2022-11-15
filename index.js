function coinflip() {
    return Math.random() < 0.5;
}

function generatePair(){

    celA = {
        color: coinflip() ? "G":"g",
        form: coinflip() ? "R":"k"
    }
    celB = {
        color: coinflip() ? "G":"g",
        form: coinflip() ? "R":"k"
    }

    return {
        a: celA,
        b: celB
    }

}

function calcGens(celA, celB){
    var out = {
        colorA: "",
        colorB: "",
        formA: "",
        formB: ""
    }

    // COLORS
    // GG
    if(celA.color == "G" && celB.color == "G") {
        out.colorA = "G";
        out.colorB = "G";
    }
    // Gg | gG
    if(celA.color != celB.color){
        out.colorA = "G";
        out.colorB = "g";
    }
    // gg
    if(celA.color == "g" && celB.color == "g") {
        out.colorA = "g";
        out.colorB = "g";
    }

    // FORMS
    // RR
    if(celA.form == "R" && celB.form == "R") {
        out.formA = "R";
        out.formB = "R";
    }
    // Rk | kR
    if(celA.form != celB.form){
        out.formA = "R";
        out.formB = "k";
    }
    // kk
    if(celA.form == "k" && celB.form == "k") {
        out.formA = "k";
        out.formB = "k";
    }
    return out;
}

function genString(gens){
    return gens.colorA + gens.colorB + gens.formA + gens.formB;
}

function calcPhen(gens){
    var color = gens.colorA == "G" ? "gelb":"grün";
    var form = gens.formA == "R" ? "rund":"kantig";

    return color + "/" + form;
}


function countStats(childs) {
    stats = {
        gelb_rund: 0,
        gelb_kantig: 0,
        gruen_rund: 0,
        gruen_kantig: 0
    }
    for(var child of childs){
        switch (child.phen){
            case "gelb/rund":
                stats.gelb_rund++;
                break;
            case "gelb/kantig":
                stats.gelb_kantig++;
                break;
            case "grün/rund":
                stats.gruen_rund++;
                break;
            case "grün/kantig":
                stats.gruen_kantig++;
                break;
        }
    }
}

function genChild(){
    cellPair = generatePair();
    childGens = calcGens(cellPair.a, cellPair.b);

    childString = genString(childGens);
    childPhen = calcPhen(childGens);

    var child = {pair: cellPair, gens: childGens, string: childString, phen: childPhen}
    return child;
}
var stats = {
    gelb_rund: 0,
    gelb_kantig: 0,
    gruen_rund: 0,
    gruen_kantig: 0
}

function main(ITERATIONS){
    var estimations = {
        gelb_rund: Math.round(ITERATIONS * 9/16),
        gelb_kantig: Math.round(ITERATIONS * 3/16),
        gruen_rund: Math.round(ITERATIONS * 3/16),
        gruen_kantig: Math.round(ITERATIONS * 1/16)
    }

    var genList = [];

    for (var i = 0; i < ITERATIONS; i++) {
        genList.push(genChild());
    }
    countStats(genList);

    return {iterations: ITERATIONS, stats: stats, expectation: estimations};    
}

