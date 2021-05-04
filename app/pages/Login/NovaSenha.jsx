import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, ScrollView, Alert } from 'react-native';
import * as Utils from './utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import Styles from './styles';
import Api from '../../services/Api';
import ApplicationContext from '../../contexts/application';
import AuthContext from '../../contexts/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import Logo from '../../../assets/img/logo.png';

const styles = StyleSheet.create(Styles);

const NovaSenha = (props) => {
    const navigation = useNavigation();
    const { setLoading } = React.useContext(ApplicationContext);
    const { sethasUpdatePassword } = React.useContext(AuthContext);

    React.useEffect( () => {
        sethasUpdatePassword(true);
    }, [])

    const handleRecover = async (data) => {
        if (data.password != data.passwordCheck) {
            return Alert.alert('Atenção', 'As senhas não conferem');
        } else {
            const validPassword = Utils.checkPassword(data.password);
            if (!validPassword)
                return Alert.alert(
                    'Atenção',
                    'Senha deve ter no mínimo 6 caracteres com pelo menos uma letra e um número'
                );
            const { code } = props.route.params;
            setLoading(true);
            const response = await Api.post(`v1/new-password`, {
                code,
                password: data.password
            });
            setLoading(false);
            if (response.status != 200) {
                Alert.alert(
                    'Atenção',
                    "Erro ao criar nova senha"
                );
            } else {
                Alert.alert(
                    'Sucesso',
                    "Nova senha criada"
                );

                return navigation.navigate('LoginManual');
            }
        }
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView style={{ width: '100%', marginTop: 30 }}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    style={{ backgroundColor: '#FFFEAB' }}
                    scrollEnabled={false}
                    keyboardOpeningTime={0}
                >
                    <View style={styles.wrapper}>
                        <Image source={Logo} style={styles.imageContainer} />
                        <Text>A melhor plataforma comercial de indicação online!</Text>
                        <Text style={styles.subTitle}>Nova senha</Text>
                        <Formik
                            initialValues={{
                                password: '',
                                passwordCheck: ''
                            }}
                            onSubmit={(data) => handleRecover(data)}
                            validationSchema={yup.object().shape({
                                password: yup.string().required(),
                                passwordCheck: yup.string().required(),
                            })}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                isValid,
                            }) => (
                                <View style={styles.socialMediaContainer}>
                                    <Input
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        placeholder="Insira uma nova senha"
                                        textContentType="password"
                                        secureTextEntry
                                        customStyle={{ marginBottom: 13 }}
                                        error={errors.password}
                                        value={values.password}
                                    />
                                    <Input
                                        onChangeText={handleChange('passwordCheck')}
                                        onBlur={handleBlur('passwordCheck')}
                                        placeholder="Confirme sua senha"
                                        textContentType="password"
                                        secureTextEntry
                                        customStyle={{ marginBottom: 13 }}
                                        error={errors.passwordCheck}
                                        value={values.passwordCheck}
                                    />
                                    <Button
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                        customStyles={{
                                            backgroundColor: '#FFD500',
                                            marginBottom: 13,
                                        }}
                                        textColor="#000"
                                        label="Enviar"
                                    />
                                </View>
                            )}
                        </Formik>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </View>
    );
};

export default NovaSenha;
