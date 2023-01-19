import { StyleSheet } from 'react-native';
import { Button, SectionList, Flex, Box, Link, Pressable, Input, Text, View } from 'native-base';
import { example } from '../database/createTable';
import React, { useState, useEffect } from 'react';
import type { Example } from '../database/createTable';

function setAllData(setLists: any) {
  example.read({
    callback: (params) => {
      setLists(params);
    },
  });
}

export default function DataBase() {
  const [list, setList] = useState([]);

  const [listId, setListId] = useState('');

  const [str, setStr] = useState('');
  useEffect(() => {
    setAllData(setList);
  }, []);
  const data = [
    {
      title: '数据',
      data: list,
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DataBase example</Text>
      <Button
        shadow={2}
        onPress={() => {
          example.create({
            callback: () => {
              setAllData(setList);
            },
            params: {
              str: `测试数据${list.length + 1}`,
            },
          });
        }}
      >
        add data
      </Button>
      <Flex direction="row">
        <Input w="30%" value={listId} onChangeText={setListId} placeholder="Enter your id" />
        <Input w="80%" value={str} onChangeText={setStr} placeholder="Enter your name" />
      </Flex>

      <Button
        shadow={2}
        onPress={() => {
          example.update({
            params: { id: Number(listId), str },
            callback: () => {
              setAllData(setList);
            },
          });
        }}
      >
        edit data
      </Button>
      <SectionList<Example & { id: string }, { title: string; Example: Example & { id: string }[] }>
        bg="amber.100"
        w="100%"
        sections={data}
        keyExtractor={(item, index) => item?.id + index}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              // setListId(item.id);
              // onOpen();
            }}
          >
            {({ isPressed, isHovered }) => (
              <Box
                flexDirection="row"
                p={2}
                justifyContent="space-between"
                bg={isPressed ? 'coolGray.200' : isHovered ? 'coolGray.200' : 'white'}
              >
                {item?.id}
                {item?.str}
                <Link
                  shadow={2}
                  onPress={() => {
                    example.deletes({
                      id: item.id,
                      callback: () => {
                        setAllData(setList);
                      },
                    });
                  }}
                >
                  delete
                </Link>
              </Box>
            )}
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Box mt={3} bg="white" flex={1} p={2} flexDirection="row" justifyContent="space-between">
            {'id'}
            {'name'}
            {'operate'}
          </Box>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
  container: {},
  title: {
    display: 'flex',
    fontSize: 30,
    fontWeight: 'bold',
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    margin: 10,
  },
  img: {},
});
