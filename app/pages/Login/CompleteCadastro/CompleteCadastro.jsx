import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import ApplicationContext from '../../../contexts/application';
import Styles from './Styles';
import * as Utils from './Utils';
import Api from '../../../services/Api';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';

import UserIcon from '../../../../assets/img/user-icon.png';

const CompleteCadastro = ({ navigation }) => {
  const { newUser, setNewUser, setLoading } = useContext(ApplicationContext);

  const [tipoPessoa] = useState([
    { label: 'Pessoa Física', value: 'PF' },
    { label: 'Pessoa Jurídica', value: 'PJ' },
  ]);
  const [activitiesBranches, setActivitiesBranches] = useState([]);
  const [economicsActivites, setEconomicsActivities] = useState([]);

  const handleCadastro = async (data) => {
    setNewUser({ ...newUser, ...data, passwordCheck: undefined });
    return navigation.navigate('RamoAtividade');
  };

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      const responseActivitiesBranches = await Api.get(
        'v1/activities-branches'
      );
      if (responseActivitiesBranches.status !== 200) {
        Alert.alert(
          'Atenção',
          'Houve um erro no servidor, reinicie a aplicação'
        );
      } else {
        setActivitiesBranches(
          responseActivitiesBranches.data.map((i) => {
            return { Name: i.name, Id: String(i.id) };
          })
        );
        const responseEconomicsActivities = await Api.get(
          'v1/economics-activities'
        );
        if (responseEconomicsActivities.status !== 200) {
          Alert.alert(
            'Atenção',
            'Houve um erro no servidor, reinicie a aplicação'
          );
        } else {
          setEconomicsActivities(
            responseEconomicsActivities.data.map((i) => {
              return { label: i.name, value: String(i.id) };
            })
          );
          setLoading(false);
        }
      }
    };

    fetchApiData();
  }, []);

  return (
    <View style={Styles.wrapper}>
      <ScrollView style={{ width: '100%' }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          keyboardOpeningTime={0}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <Image source={UserIcon} style={Styles.iconImg} />
          <Text style={Styles.bemVindoText}>Bem vindo {newUser.name}!</Text>
          <Text style={Styles.subTitle}>Complete seu Cadastro</Text>
          <Formik
            initialValues={{
              tipoPessoa: 'PF',
              ramoAtividade: '',
              nomeEmpresa: '',
              atividadeEconomica: '',
              celular: '',
              website: '',
              facebook: '',
            }}
            onSubmit={(data) => handleCadastro(data)}
              validationSchema={yup.object().shape({
             tipoPessoa: yup.string().required(),
            ramoAtividade: yup.string().when('tipoPessoa', {
            is: 'PF',
            then: yup.string().required(),
           // }),
            // nomeEmpresa: yup.string().when('tipoPessoa', {
            // is: 'PJ',
            // then: yup.string().required(),
            }),
          //    atividadeEconomica: yup.string().when('tipoPessoa', {
          //    is: 'PJ',
          //    then: yup.string().required(),
          //  }),
           celular: yup.string().min(14).max(15).required(),
              website: yup.string(),
             facebook: yup.string(),
            })}
          >
            {({
              handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <View style={Styles.socialMediaContainer}>
                <Text style={Styles.labelFormText}>Sou:</Text>
                <Select
                  customStyle={{ marginBottom: 13 }}
                  value={values.tipoPessoa}
                  placeholder={{}}
                  onValueChange={handleChange('tipoPessoa')}
                  error={errors.tipoPessoa}
                  items={tipoPessoa}
                />
                <Select
                  customStyle={{
                    marginBottom: 13,
                    display: values.tipoPessoa === 'PJ' ? 'none' : 'flex',
                  }}
                  value={values.ramoAtividade}
                  placeholder={{ label: 'Profissão', value: '' }}
                  onValueChange={handleChange('ramoAtividade')}
                  error={errors.ramoAtividade}
                  items={activitiesBranches}
                  isSearchable={true}
                />
                <Input
                  onChangeText={handleChange('nomeEmpresa')}
                  onBlur={handleBlur('nomeEmpresa')}
                  placeholder="Nome da Empresa:"
                  textContentType="name"
                  customStyle={{
                    marginBottom: 13,
                    display: values.tipoPessoa === 'PF' ? 'none' : 'flex',
                    paddingLeft: 15,
                  }}
                  error={errors.nomeEmpresa}
                  value={values.nomeEmpresa}
                />
                <Select
                  customStyle={{
                    marginBottom: 13,
                    display: values.tipoPessoa === 'PF' ? 'none' : 'none',
                  }}
                  value={values.atividadeEconomica}
                  placeholder={{ label: 'Atividade Econômica', value: '' }}
                  onValueChange={handleChange('atividadeEconomica')}
                  error={errors.atividadeEconomica}
                  items={economicsActivites}
                />

                <Text style={Styles.labelFormText}>Contatos:</Text>
                <Input
                  onChangeText={(e) =>
                    setFieldValue('celular', Utils.phoneMaskInput(e))
                  }
                  onBlur={handleBlur('celular')}
                  placeholder="WhatsApp:"
                  textContentType="telephoneNumber"
                  keyboardType="number-pad"
                  maxLength={15}
                  customStyle={{ marginBottom: 13 }}
                  error={errors.celular}
                  value={values.celular}
                />
                <Input
                  onChangeText={handleChange('website')}
                  onBlur={handleBlur('website')}
                  placeholder="Website:"
                  textContentType="name"
                  customStyle={{ marginBottom: 13 }}
                  error={errors.website}
                  value={values.website}
                />
                <Input
                  onChangeText={handleChange('facebook')}
                  onBlur={handleBlur('facebook')}
                  placeholder="Perfil do Facebook:"
                  textContentType="name"
                  customStyle={{ marginBottom: 13 }}
                  error={errors.facebook}
                  value={values.facebook}
                />
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid}
                  customStyles={{
                    backgroundColor: '#FFD500',
                    marginTop: 15,
                  }}
                  textColor="#000"
                  label="Ir para o Ramo de Atividade"
                />
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

export default CompleteCadastro;
