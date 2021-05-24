import React, { Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Touchable } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends Component {
    constructor() {
        super();

        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            bnState: 'normal'
        }
    }

    getCameraPermission = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
            scanned: false,
            bnState : 'clicked',
            scannedData: '',
        })
    }

    handleBarcodeScan = (type, data) => {
        this.setState = {
            scanned: true,
            scannedData: data,
            bnState: 'normal'
        }
    }

    render() {
        const hasCameraPermission = this.state.hasCameraPermission
        const scanned = this.state.scanned
        const bnState = this.state.bnState

        if(bnState === 'clicked' && hasCameraPermission) {
            return(
                <BarCodeScanner 
                  onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScan}
                  style = {StyleSheet.absoluteFillObject}
                />
              )
                    
        } else if(bnState === 'normal') {
            return(
                <View style={style.container}>
                    <Text style={style.bnText}>{hasCameraPermission=== true ? this.state.scannedData : "Request Camera Permission"}</Text>

                    <TouchableOpacity style={style.scanBn} onPress={this.getCameraPermission}>
                        <Text style={style.bnText}>Scan QR Code</Text>
                    </TouchableOpacity> 
                </View>
            )
        }
    }
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    scanBn: {
      backgroundColor: 'yellow',
      padding: 10,
      margin: 10,
      borderWidth: 4,
    },
  
    bnText: {
      fontSize: 18,
      fontWeight: 'bold',
    }
  })