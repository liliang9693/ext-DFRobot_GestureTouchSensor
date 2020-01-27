
//% color="#AA278D" iconWidth=50 iconHeight=40
namespace GestureTouchSensor {


    //% block="GestureTouchSenso Initliallize Pin [SSER] Rx[SSTXD] Tx[SSRXD]" blockType="command"
    //% SSER.shadow="dropdown" SSER.options="SSER"
    //% SSRXD.shadow="dropdown" SSRXD.options="SSRXD"
    //% SSTXD.shadow="dropdown" SSTXD.options="SSTXD"

    export function beginSoftSerial(parameter: any, block: any) {
        let sser=parameter.SSER.code;
        let rx = parameter.SSRXD.code;
        let tx = parameter.SSTXD.code;

            Generator.addInclude("includeGT","#include <DFRobot_Gesture_Touch.h>");
            Generator.addInclude("includesoftSerial","#include <SoftwareSerial.h>");
                
            Generator.addObject("softSerialObject","SoftwareSerial",`${sser}(${rx}, ${tx});`);
            Generator.addObject("GestureObject"+sser,"DFRobot_Gesture_Touch",`DFGT(&${sser});`);
            Generator.addObject("quanjubianliang","float",`GTVar=-1;`);

            Generator.addSetup("GTSerialSetup"+sser,`${sser}.begin(9600);`);
            Generator.addSetup("distance",`DFGT.setGestureDistance(10);`)
            

    }
    //% board="arduino,esp32"
    //% block="GestureTouchSensor Initliallize Pin [SER] Rx[TXD] Tx[RXD]" blockType="command"
    //% SER.shadow="dropdown" SER.options="SER"
    //% RXD.shadow="dropdown" RXD.options="RXD"
    //% TXD.shadow="dropdown" TXD.options="TXD"

    export function beginSerial(parameter: any, block: any) {  
        let ser=parameter.SER.code;
        let rx = parameter.RXD.code;
        let tx = parameter.TXD.code;

            Generator.addInclude("includeGT","#include <DFRobot_Gesture_Touch.h>");

            Generator.addObject("GestureObject"+ser,"DFRobot_Gesture_Touch",`DFGT(&${ser});`);
            Generator.addObject("quanjubianliang","float",`GTVar=-1;`);

            Generator.addSetup("GTSerialSetup",`${ser}.begin(9600,${rx}, ${tx});`);
            Generator.addSetup("distance",`DFGT.setGestureDistance(10);`)

    }

    //% block="GestureTouchSensor request once" blockType="command"
    export function readSensor(){
        Generator.addCode("GTVar=DFGT.getAnEvent();");
    }

    //% block="GestureTouchSensor [RSLT] is true?" blockType="boolean"
    //% RSLT.shadow="dropdown" RSLT.options="RSLT"
    export function rslt(parameter: any){
        let rslt=parameter.RSLT.code;
        Generator.addCode(`(GTVar==${rslt})`);
    }

    //% block="GestureTouchSensor set distence is [DT] cm" blockType="command"
    //% DT.shadow="range" DT.params.min="0" DT.params.max="30" DT.defl="20"
    export function setDistence(parameter: any){
        let dt=parameter.DT.code;
        
        Generator.addSetup("distance",`DFGT.setGestureDistance(${dt});`,true)
    }

    
    //% block="GestureTouchSensor set sleep is [SP]" blockType="command"
    //% SP.shadow="number"  SP.defl="5"
    export function setSleep(parameter: any){
        let sp=parameter.SP.code;
        Generator.addSetup("sleep",`DFGT.setSleep(${sp});`,true);
    }

    
    //% block="GestureTouchSensor set[DE] enable is [DERSLT]" blockType="command"
    //% DE.shadow="dropdown" DE.options="DE" 
    //% DERSLT.shadow="dropdown" DERSLT.options="DERSLT"
    export function setEnable(parameter: any){
        let de=parameter.DE.code;
        let derslt=parameter.DERSLT.code;
        if(de==="enable"){
            Generator.addSetup("ID_"+derslt,`DFGT.enableFunction(${derslt});`)
        }else{
            Generator.addSetup("ID_"+derslt,`DFGT.disableFunction(${derslt});`)

        }
        
    }




}
