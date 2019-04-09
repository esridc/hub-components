import {} from 'jest'

// stub the register for event methods instead of actually making real calls

const allGood = { success: true, groupId: "fe8" };

export const registerForEvent = jest.fn().mockResolvedValue(allGood);
export const unregisterForEvent = jest.fn().mockResolvedValue(allGood);
