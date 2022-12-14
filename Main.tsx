import React from 'react';
import {Animated, FlatList, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Checkbox from "expo-checkbox";
import {addTaskAC, changeIsDoneAC, TaskType} from "./src/redux/slice";
import {useAppDispatch, useAppSelector} from "./src/redux/store";


export const Main = () => {

    const tasks = useAppSelector(state => state.reducer.tasks)
    const dispatch = useAppDispatch()

    // const [task, setTask] = React.useState<TaskType[]>([
    //     {
    //         id: 1,
    //         title: 'HTML',
    //         isDone: true
    //     },
    //     {
    //         id: 2,
    //         title: 'CSS',
    //         isDone: false
    //     },
    //     {
    //         id: 3,
    //         title: 'ReactNative',
    //         isDone: false
    //     },
    //     {
    //         id: 4,
    //         title: 'React',
    //         isDone: false
    //     },
    // ])

    const [show, setShow] = React.useState(true)
    const [title, setTitle] = React.useState('')

    const animatedValue = React.useRef(new Animated.Value(0)).current
    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -80]
    })

    const startAnimate = (show: boolean) => {
        if (show) {
            Animated.timing(animatedValue, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: 0,
                useNativeDriver: true
            }).start()
        }
    }

    const close = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const changeIsDone = (id: number, isDone: boolean) => {
        dispatch(changeIsDoneAC({id, isDone}))
       // setTask(task.map(task => task.id === id ? {...task, isDone: value} : task))
    }

    const addTask = () => {
        dispatch(addTaskAC({title}))
        setTitle('')
        close()
    }

    const renderItem: ListRenderItem<TaskType> = ({item, index, separators})=> {
        return (
            <View key={item.id} style={styles.row}>
                <Checkbox
                    value={item.isDone}
                    onValueChange={(value) => {
                        changeIsDone(item.id, value)
                    }}/>
                <Text style={styles.text}>{item.title}</Text>
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={tasks}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
            <Animated.View style={{...styles.containerAbsolute, bottom: -80, transform: [{translateY}]}}>
                <View style={{height: 40, alignItems: 'center', marginTop: 10}}>
                    <Text style={styles.separator} onPress={() => {
                        setShow(!show)
                        startAnimate(show)
                    }}/>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TouchableOpacity onPress={addTask}>
                        <View>
                            <Text style={{fontSize: 16}}>ADD TASK</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
       // backgroundColor: '#080b1a',
        paddingHorizontal: 20,
        marginTop: 50
    },
    row: {
        flexDirection: "row",
        backgroundColor: '#0d155c',
        marginVertical: 5,
        padding: 20,
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        color: '#ffffff',
        marginLeft: 20
    },
    containerAbsolute: {
        position: "absolute",
        bottom: 0,
        backgroundColor: '#c2c6d2',
        width: '100%'
    },
    separator: {
        width: 100,
        height: 20,
        backgroundColor: '#080b1a',
        overflow: "hidden",
        borderRadius: 20 / 2
    },
    inputBox: {
        height: 80, backgroundColor: '#c2c6d2',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        width: 150,
        height: 42,
        backgroundColor: '#ffffff',
        fontSize: 18
    }
});

