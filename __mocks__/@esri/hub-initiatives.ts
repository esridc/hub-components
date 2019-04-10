import {} from 'jest'

// stub the initiative follow methods instead of actually fetching features

const allGood = { success: true, username: "c@sey" };

export const followInitiative = jest.fn().mockResolvedValue(allGood);
export const unfollowInitiative = jest.fn().mockResolvedValue(allGood);
