
import React, { useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { INITIAL_ACTIVITIES } from '../data/activities';
import { useApp } from '../context/AppContext';

export default function ActivitiesScreen() {
    const { theme } = useApp();
    const dark = theme === 'dark';

    const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
    const [filter, setFilter] = useState('All');

    const filteredActivities = activities.filter(activity => {
        if (filter === 'Pending') return !activity.done;
        if (filter === 'Completed') return activity.done;
        return true;
    });

    function toggleActivity(id) {
        setActivities(current =>
            current.map(activity =>
                activity.id === id
                    ? { ...activity, done: !activity.done }
                    : activity
            )
        );
    }

    const completedCount = activities.filter(item => item.done).length;

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: dark ? '#111827' : '#F4F6FB' },
            ]}
        >
            <Text style={[styles.title, { color: dark ? '#F9FAFB' : '#172033' }]}>
                My Activities
            </Text>

            <Text style={[styles.summary, { color: dark ? '#D1D5DB' : '#64748B' }]}>
                Completed: {completedCount} / {activities.length}
            </Text>

            <View style={styles.filters}>
                {['All', 'Pending', 'Completed'].map(item => (
                    <Pressable
                        key={item}
                        onPress={() => setFilter(item)}
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor:
                                    filter === item
                                        ? '#3157D5'
                                        : dark
                                            ? '#1F2937'
                                            : '#E2E8F0',
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color:
                                    filter === item
                                        ? '#FFFFFF'
                                        : dark
                                            ? '#F9FAFB'
                                            : '#172033',
                                fontWeight: '600',
                            }}
                        >
                            {item}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <FlatList
                data={filteredActivities}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={{ color: dark ? '#D1D5DB' : '#64748B' }}>
                        No activities in this category.
                    </Text>
                }
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => toggleActivity(item.id)}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: item.done }}
                        style={[
                            styles.card,
                            { backgroundColor: dark ? '#1F2937' : '#FFFFFF' },
                        ]}
                    >
                        <View style={styles.row}>
                            <Text style={styles.check}>{item.done ? '☑' : '☐'}</Text>

                            <View style={styles.details}>
                                <Text
                                    style={[
                                        styles.activityTitle,
                                        {
                                            color: dark ? '#F9FAFB' : '#172033',
                                            textDecorationLine: item.done ? 'line-through' : 'none',
                                        },
                                    ]}
                                >
                                    {item.title}
                                </Text>

                                <Text style={styles.category}>{item.category}</Text>

                                <Text style={{ color: dark ? '#D1D5DB' : '#64748B', marginTop: 5 }}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    summary: {
        fontSize: 15,
        marginTop: 8,
        marginBottom: 18,
    },
    filters: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 15,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: 9,
        alignItems: 'center',
    },
    list: {
        paddingBottom: 25,
        flexGrow: 1,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    check: {
        fontSize: 25,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 17,
        fontWeight: '600',
    },
    category: {
        color: '#3157D5',
        fontSize: 13,
        marginTop: 4,
    },
});