import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Details (){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, 
        estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" 
        com valor de ${Intl.NumberFormat
            ('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(incident.value)}`;

    function navigationBack(){
        navigation.goBack()
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })

    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View styles={styles.container}>
            <View style={styles.header}>
                <Image source= {LogoImg}/>
               <TouchableOpacity onPress={() => {}}>
                   <Feather name="arrow-left" size={28} color="#E02041" />
               </TouchableOpacity>
            </View>
            <View style={styles.incident}>

                    <Text style = {[styles.incidentProperty,{ marginTop: 0 }]}>ONG:</Text>
    <Text style = {styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style = {styles.incidentProperty}>CASO:</Text>
                    <Text style = {styles.incidentValue}> {incident.title} </Text>

                    <Text style = {styles.incidentProperty}>VALOR:</Text>
                    <Text style = {styles.incidentValue}> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} </Text>


            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions} onPress={sendWhatsApp}>
                    <TouchableOpacity style={styles.action}>
                        <Text style={styles.actionText}>WhatsApp</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>

                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}