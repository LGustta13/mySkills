import 
  React, 
  {useEffect,
useState} from 'react';

import {
  View,
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  ScrollView, // Listas pequenas
  FlatList, // Listas grandes
  StatusBar
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date?: Date;
} // Representação de dados

export function Home(){

  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills([...mySkills, data]);
  };

  function handleRemoveSkill(id : string){
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  }

  // Função executada assim que a dependência é modificada useEffect(() => {}, [])
  // Carrega sempre uma vez n o início da interface
  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12){
      setGreetings('Good morning');
    } else if (currentHour >= 12 && currentHour < 18){
      setGreetings('Good afternoon');
    } else {
      setGreetings('Good evening');
    }
  }, []);   // [mySkills]

  return(
    <View style={styles.container}>   
      <StatusBar 
        barStyle="light-content"
        backgroundColor='#121015'
      />

      <Text style={styles.title}>
        Olá, Gustavo!
      </Text>

      <Text style={styles.greetings}>
        {greetings}
      </Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Insira aqui a skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill} // onChangeText={text => setnewSkill(text)}
      />

      <Button 
        title="Adicionar"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, {marginVertical:30}]}>
        Minhas skills
      </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        data={mySkills}
        keyExtractor={skill => skill.id}
        renderItem={(skill) => (
          <SkillCard 
            skill={skill.item.name}
            onPress={() => handleRemoveSkill(skill.item.id)}
          />
        )}
      />

{/*       <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {
          /* As chaves possibilitam juntar Javascript com JSX 
          mySkills.map(skill => (
            <SkillCard 
              key={skill}
              skill={skill}
            />
          ))
        }
      </ScrollView>
 */}    

    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  title:{
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },

  input:{
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS == 'ios' ? 15:10,
    marginTop: 30,
    borderRadius: 7
  },

  scroll:{
    paddingVertical: 5
  },

  greetings:{
    color:'#FFF'
  }
});




