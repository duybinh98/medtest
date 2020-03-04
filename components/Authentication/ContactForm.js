import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Stylesheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

//validation
const required = value => value ? undefined: 'Required';
const isNumber = value => value && isNaN(Number(value)) ? 'Must be phone number' : undefined;
const isPhonenumber = value => value && value.length == 10 ? undefined : 'Must be 10 digits' ;
const isEmail = value => 
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
const isWeakPassword = value => value && value.length > 6 ? undefined : 'Your password is weak!';


const renderField = ({ label, keyboardType, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View style={{ flexDirection: 'column', height: 70, alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", width: 80 }}>{label}</Text>
                <TextInput style={{ borderColor: 'steelblue', borderWidth: 1, height: 37, width: 220, padding: 5 }}
                    keyboardType={keyboardType} onChangeText={onChange} {...restInput} autoCapitalize = 'none'
                ></TextInput>
            </View>
            {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
    );
}

const sumbit = values => {
    alert(`Validation success. Values = ~${JSON.stringify(values)}`);
}

const ContactComponent = props => {
    const { handleSubmit } = props;
    return (
        <View style={{ flex: 1, flexDirection: 'column', margin: 40, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 10 }}
            >Redux-form</Text>
            <Field name="username" keyboardType="default" label="Username: " component={renderField}
                validate = {[required , isPhonenumber, isNumber]}
            />
            <Field name="email" keyboardType="email-address" label="Email: " component={renderField} 
                validate = {required}
                warn = {isWeakPassword}
            />
            <TouchableOpacity onPress={handleSubmit(sumbit)} style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{
                    backgroundColor: 'steelblue', color: 'white', fontSize: 16,
                    height: 37, width: 200, textAlign: 'center', padding: 10
                }}
                >Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const ContactForm = reduxForm({
    form: 'contact',
    // validate
})(ContactComponent);

export default ContactForm;