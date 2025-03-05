import React, { useState, useRef, useEffect } from 'react';
import { FilterPanel } from './lineup/FilterPanel';
import { ArtistTable } from './lineup/ArtistTable';
import { ColumnSelector } from './lineup/ColumnSelector';
import { ActionButtons } from './lineup/ActionButtons';
import { PlaylistModal } from './lineup/PlaylistModal';
import { LineupHeader } from './lineup/LineupHeader';
import { LineupStats } from './lineup/LineupStats';
import { TextExport } from './lineup/TextExport';
import { ArtistData, ColumnPreferences } from '../types/lineup-types';

const ElectricForestLineup = () => {
    const copyRef = useRef(null);

    // Add state for selected artists and column preferences
    const [selectedArtists, setSelectedArtists] = useState<Record<string, boolean>>({});
    const [columnPreferences, setColumnPreferences] = useState<ColumnPreferences>({
        name: true,
        category: true,
        day: true
    });

    // New state for music service preference
    const [musicService, setMusicService] = useState<string>("spotify");
    
    // Define all artists with their categories and days
    const allArtists: ArtistData[] = [
        // Headliners (by day)
        { name: "Justice", category: "Headliner", day: "Thursday", spotifyId: "1gR0gsQYfi6joyO1dlp76c", youtubeId: "UC9DxnSS4_X1ZpJ-DiuDOWAA" },
        { name: "Liquid Stranger", category: "Headliner", day: "Thursday", spotifyId: "4h9S6ajIBcXOb0lN40jSMz", youtubeId: "UC2aFRRQJR7hq1eqahgl87nA" },
        { name: "Sara Landry", category: "Headliner", day: "Thursday", spotifyId: "4OjhNmdjdMFORIaTOygXTj", youtubeId: "UCzP5I4aEVQJYxgkG1K7ZMLw" },
        { name: "Vintage Culture", category: "Headliner", day: "Thursday", spotifyId: "5pBcPCObQOzuCrFxcxQFhL", youtubeId: "UCy_hzCUhjtWLJXX9W4Ee08Q" },
        { name: "Tiësto", category: "Headliner", day: "Friday", spotifyId: "2o5jDhtHVPhrJdv3cEQ99Z", youtubeId: "UCPk3RMMXAfLhMJPFpQhye9g" },
        { name: "Louis The Child", category: "Headliner", day: "Friday", spotifyId: "7wg1qvie3KMkHeNUI63ade", youtubeId: "UCF-InjLzCn_h8A4rWiS-nIw" },
        { name: "Worship", category: "Headliner", day: "Friday", spotifyId: "2gYuXdG0zPDGlAHBrWrMlc", youtubeId: "UCCdbSUu2qoVHXlUqnYpB_6A" },
        { name: "Cloonee", category: "Headliner", day: "Friday", spotifyId: "1KmtWPNNBJw4spLrQkPrXQ", youtubeId: "UC5-umfrfqPvDvWCYHJKdA0Q" },
        { name: "Zeds Dead", category: "Headliner", day: "Saturday", spotifyId: "67qogtRNI0GjUr8PlaG6Zh", youtubeId: "UCJcEMVK5e041jcynFCq7CZA" },
        { name: "Disclosure", category: "Headliner", day: "Saturday", spotifyId: "6nS5roXSAGhTGr34W6n7Et", youtubeId: "UCi4YviCVDzGq9nqAG-Wv7RQ" },
        { name: "Barry Can't Swim", category: "Headliner", day: "Saturday", spotifyId: "2oTDwifSKiw1Be6FO8bdL8", youtubeId: "UCDiG3Txw8ZF7N7TiCH2qvEg" },
        { name: "Fisher", category: "Headliner", day: "Sunday", spotifyId: "656aFKmayOisC1W0dU82Eo", youtubeId: "UCO-kMoTwOBGgvHLbLzx-dFw" },
        { name: "Khruangbin", category: "Headliner", day: "Sunday", spotifyId: "2mVVjNmdjXZZDvhgQWiakk", youtubeId: "UCMc4XcmUQH5RuEt_X9QL_Qg" },
        { name: "Of The Trees", category: "Headliner", day: "Sunday", spotifyId: "38WbKH6oKAZskBhqDFA8Uj", youtubeId: "UC0p2OlMC6q3YlNtCQ3PEEkg" },
        { name: "Mochakk", category: "Headliner", day: "Sunday", spotifyId: "6x35XXUUwGXuQk8IYPclfK", youtubeId: "UCnOx-dpcxjLTgEgJiKDKn7w" },
        { name: "The String Cheese Incident", category: "Headliner", day: "Special", spotifyId: "07QXDw5ZsE3ZvvhgowHhQB", youtubeId: "UCBWbmfV4SnKiuoB-HgPAOmA" },

        // Drop 1 Artists (listed alphabetically in the image)
        { name: "Arc De Soleil", category: "Featured Artists", day: "", spotifyId: "0TnOYISbd1XYRBk9myaseg", youtubeId: "UC-Example1" },
        { name: "Avalon Emerson", category: "Featured Artists", day: "", spotifyId: "3X72GYexyZjp4sP0jkHs8z", youtubeId: "UC-Example2" },
        { name: "BBNO$", category: "Featured Artists", day: "", spotifyId: "0Lzi0u6IQRRCXUCRkQ2lOm", youtubeId: "UCs2C0PSgnCDfxCU-nRBX5FA" },
        { name: "Blond:ish", category: "Featured Artists", day: "", spotifyId: "6qqZ9I0u7xas9H3nEyNiXd", youtubeId: "UCxEcIlJHB0mFhJqDMswA7Cg" },
        { name: "Bunt.", category: "Featured Artists", day: "", spotifyId: "20gsENnposVs2I4rQ5kvrf", youtubeId: "UCqmJ_URHh_EJVEAfdNW5tUw" },
        { name: "Caribou", category: "Featured Artists", day: "", spotifyId: "4EnEZVjo3w1cwcQYePccay", youtubeId: "UCa0FZ7-Ee_EWCWZDCSwNLrg" },
        { name: "Confidence Man", category: "Featured Artists", day: "", spotifyId: "520yrT1yvIbzHWfp20d0vt", youtubeId: "UC2D4n1A-aO6Hkgwm-2grHiw" },
        { name: "Crankdat", category: "Featured Artists", day: "", spotifyId: "0NGAZxHanS9e0iNHpR8f2W", youtubeId: "UCb4xYdQCpyufrUWjdrXr-fA" },
        { name: "Daphni", category: "Featured Artists", day: "", spotifyId: "7wBZTRNiNIsqapT9Q3M0AD", youtubeId: "UCJ2fhrI1bIgExRn1fFOqMEQ" },
        { name: "Dimension", category: "Featured Artists", day: "", spotifyId: "6JKlN5qNcU2yc6D5UMhini", youtubeId: "UCwbWzl7JLK_Ey8XjSAIOaYA" },
        { name: "DJ Heartstring", category: "Featured Artists", day: "", spotifyId: "6rrBrPYdAc1IOF2MVqEJXD", youtubeId: "UC_AZ6X_flsAvP-W3TbOSOzw" },
        { name: "Dombresky", category: "Featured Artists", day: "", spotifyId: "5cnJhXDSVcGgTuMnZZrveJ", youtubeId: "UCjlSXRPgcuGQXIvWFZ9VtmA" },
        { name: "Disco Dom", category: "Featured Artists", day: "", spotifyId: "0jjbeZjO4QeGXWNDtRGzAA", youtubeId: "UCl98C_aaup8dI2JVp_RbqYw" },
        { name: "FCUKERS", category: "Featured Artists", day: "", spotifyId: "7M9S6gl9qzQIgCqPc8ncYM", youtubeId: "UCVkgMSP3Ng9iVZe-046YitA" },
        { name: "Gashi", category: "Featured Artists", day: "", spotifyId: "1MNZjGwtDTxHyCYxPl2Qd6", youtubeId: "UCIQ2PuWMo4wOkKieFR0u5Tw" },
        { name: "Gordo", category: "Featured Artists", day: "", spotifyId: "3OXYc3K5N4vxDrDI9J6UrC", youtubeId: "UCLrCdpjV59eVQOFR7qjLJlA" },
        { name: "Hamdi", category: "Featured Artists", day: "", spotifyId: "5WzGrjxFaiTRYlFLaAJaIC", youtubeId: "UCJuFvjGVXkS6V5xgpGJz6bA" },
        { name: "Hayla", category: "Featured Artists", day: "", spotifyId: "1MbQAzKqBZpxI2c9llOoXZ", youtubeId: "UCOqEepotRCcg9rPV--eCYTQ" },
        { name: "Interplanetary Criminal", category: "Featured Artists", day: "", spotifyId: "5CsvGqv2XLiqgFZUlSVhO8", youtubeId: "UCTLmcRXM7QeRl3BRNPcXDhQ" },
        { name: "Jade Cicada", category: "Featured Artists", day: "", spotifyId: "67asSR2lm0qL0iMPJCKg4q", youtubeId: "UCBkzh0g_RTMQBCEWw2mnlcg" },
        { name: "Jersey", category: "Featured Artists", day: "", spotifyId: "6T9MJpkPxurvdZjCzM6nqZ", youtubeId: "UC8hV6z7W27IHNvy7A1O5dRw" },
        { name: "Joey Valence & Brae", category: "Featured Artists", day: "", spotifyId: "0EiWoOGX4JYO3lwd2qeJlS", youtubeId: "UCLyVUCJ2k_wuwRCDfOITCDQ" },
        { name: "Lilly Palmer", category: "Featured Artists", day: "", spotifyId: "3yw4GlsOhRwFClTRzJM9gN", youtubeId: "UC2C_Xi97HGLdVMoqxB55DQg" },
        { name: "Logo Dice", category: "Featured Artists", day: "", spotifyId: "5fQ8bR7R3Qp15szvCnHLhK", youtubeId: "UCmBx7AgZ9v-7vGIhLdcSRKQ" },
        { name: "Mersiv", category: "Featured Artists", day: "", spotifyId: "2cGLOkq73PzW4ofCZ5jJT3", youtubeId: "UCB0a-Dqiuh-JE8uc5_odrMg" },
        { name: "Mike Posner", category: "Featured Artists", day: "", spotifyId: "2KsP6tYLJlTBvSUxnwlVWa", youtubeId: "UCUvQQsJt7fREhXdmMeKnl5Q" },
        { name: "Mindchatter", category: "Featured Artists", day: "", spotifyId: "14H7yLPHsvxbHPsNGAbRmn", youtubeId: "UC9VwRhpojtU9k8hPTnmDwBQ" },
        { name: "Nia Archives", category: "Featured Artists", day: "", spotifyId: "5RdUAKFkhY1TvKTdXuOu9e", youtubeId: "UC0xB4E0JsqPaJvb7Glr_IVw" },
        { name: "Notion", category: "Featured Artists", day: "", spotifyId: "6tIx5jTv9aMYdGuS1NdUMY", youtubeId: "UCCRvRzrQ5pPDFXkqK4mVGKg" },
        { name: "Ray Volpe", category: "Featured Artists", day: "", spotifyId: "28kfdl5wcx5GZ6ScOPP7lF", youtubeId: "UCN0rK1Eo5pKAaYhYRB7a2cw" },
        { name: "Sub Focus", category: "Featured Artists", day: "", spotifyId: "0QaSiI5JyCepXNwERFak1U", youtubeId: "UCO1D8LkZgn9TK7vVnL6YmuQ" },
        { name: "Tape B", category: "Featured Artists", day: "", spotifyId: "1KvIIKQcUYTYkLR7Tns12r", youtubeId: "UCT-yO0bJX7KCDXvRSgIbwcA" },
        { name: "The Knocks & Dragonette", category: "Featured Artists", day: "", spotifyId: "5BZ0Jj265UkY5Pw5LLiPcG", youtubeId: "UC1NjzKhXFLStZXlLsLuwZgw" },
        { name: "Tractorbeam", category: "Featured Artists", day: "", spotifyId: "4eDZCt4zgA1tnRxQW9bcD5", youtubeId: "UCFgx4cVOYy6z8JOaZjIOx-g" },
        { name: "Will Clarke", category: "Featured Artists", day: "", spotifyId: "4YwB41gFHCxY5bcNR3CaLN", youtubeId: "UCuMNdIeZZYSYPu8U7wowjoA" },
        { name: "Zingara", category: "Featured Artists", day: "", spotifyId: "3u0zMT88iLZ3S4uIPVzU6O", youtubeId: "UCu4XnLuZWXCGc-Nn6QnpB3A" },

        // Drop 2 Artists (sample with some IDs filled in)
        { name: "1991", category: "Supporting Artists", day: "", spotifyId: "3apw3TwWOJWuEN9JKjZhn9", youtubeId: "UCG3B2iUxKkg2byBNRSUT-PA" },
        { name: "ITSBP", category: "Supporting Artists", day: "", spotifyId: "6PfGbqvs3E9z8QkNMOgBxT", youtubeId: "UCw_C2fQc5p9YVjCvEFWEQXw" },
        { name: "88 Below", category: "Supporting Artists", day: "", spotifyId: "6M74FVr2Na5VfhD7uqMc0b", youtubeId: "UCwv0uN3WcVXSjULewDfq_aQ" },
        { name: "Ahee", category: "Supporting Artists", day: "", spotifyId: "2BHp4KW5tgRNqHGZ9C1LoG", youtubeId: "UCcvzBJoWZgxHHjMmxJNWOvA" },
        { name: "Ahmed Spins", category: "Supporting Artists", day: "", spotifyId: "1YoYTgJmNqEYuPCk1cHPWL", youtubeId: "UCXlppUxDFMnKaRlJe-99Cpw" },
        { name: "Alex Wann", category: "Supporting Artists", day: "", spotifyId: "3Y0JLsWwpzc2mnzqg7SCLd", youtubeId: "UCRcT51mRf3d_ChJ-0aQUbWQ" },
        { name: "Arushi Jain", category: "Supporting Artists", day: "", spotifyId: "2sCXTFN6xGmcBzGa4HRkEW", youtubeId: "UCu7rrsBYb7d-oIlKQ1ekGFg" },
        { name: "Balthvs", category: "Supporting Artists", day: "", spotifyId: "4Q1zS3MbKOb8tHjsrtYDjb", youtubeId: "UCCOmADwuGzhPrKQeF9AP_Sw" },
        { name: "Bambi", category: "Supporting Artists", day: "", spotifyId: "56ZSG2Q9fYruwPYt5P8azz", youtubeId: "UC_L8vYNST8LNI-0-ZvxP-MQ" },
        { name: "Basstripper", category: "Supporting Artists", day: "", spotifyId: "5bFQy1LlBgXHiWpLorzjMv", youtubeId: "UCsE0JlBGmXYgpVhJAg8fwLg" },
        { name: "Basstripper", category: "Supporting Artists", day: "", spotifyId: "5bFQy1LlBgXHiWpLorzjMv", youtubeId: "UCsE0JlBGmXYgpVhJAg8fwLg" },
        { name: "Beltran", category: "Supporting Artists", day: "", spotifyId: "4j5Zj1Bvg01VbZPzH8agcR", youtubeId: "UC5F3KVT7aMFkABW5xuXY9pA" },
        { name: "Bianco", category: "Supporting Artists", day: "", spotifyId: "0RSC6j15xR1iqAGmzFXVUw", youtubeId: "UCwKfwH0OAf_tPtJvK7-xXIw" },
        { name: "Culture Shock", category: "Supporting Artists", day: "", spotifyId: "5U75EagbDKe0BFGhEbWHuS", youtubeId: "UCxP6pSkE47rsJGRBF0ky9Qg" },
        { name: "CVBZ", category: "Supporting Artists", day: "", spotifyId: "6WRYQC5UvBcqTkOGBeCTFf", youtubeId: "UCNXSdvWcnlzE9JXOFRStU7A" },
        { name: "Cydnee With A C", category: "Supporting Artists", day: "", spotifyId: "5M6VLxYbmsRjNQnIK3qLTp", youtubeId: "UCEWs5454CkhYfzpHjgOIcZw" },
        { name: "Dixon's Violin", category: "Supporting Artists", day: "", spotifyId: "0nDvKxWA1n07gC9y4qPdvT", youtubeId: "UC7MQv5H-e05jEzJ_JvQY7uw" },
        { name: "Eater", category: "Supporting Artists", day: "", spotifyId: "1ZgDDTPvcQSkKCiw92YhFT", youtubeId: "UCGveTuJqB94EwDH9oCdiPEQ" },
        { name: "Evening Elephants", category: "Supporting Artists", day: "", spotifyId: "0CuIPk6ZFPlbQNrQESh6kG", youtubeId: "UCxTY1-ZO0u6ruwHQOCrKPRA" },
        { name: "Gorillat", category: "Supporting Artists", day: "", spotifyId: "1VLtYJBxe98FbKJWKd9tYr", youtubeId: "UCIoaqqH6ViJeN6-MNsZrrqg" },
        { name: "Harry", category: "Supporting Artists", day: "", spotifyId: "1Zo0es0DXjIySXvoinGmnd", youtubeId: "UCfQn7BqQ-hVTVX5MRNmvUlA" },
        { name: "Haute & Freddy", category: "Supporting Artists", day: "", spotifyId: "2L5SRi0HrWaPHVCZcKMKBn", youtubeId: "UCzPgZAW-7Zm5M0rMiMIyS-g" },
        { name: "Infekt", category: "Supporting Artists", day: "", spotifyId: "3XVICZjAf8hMQyAOpzVc21", youtubeId: "UC-QZRM5EyQGVh6QGUWetmzA" },
        { name: "Jerro", category: "Supporting Artists", day: "", spotifyId: "51aqmKxGYjnXwS8WQpEHJK", youtubeId: "UC-cPLLYhKG-QYhdB7gOFoLQ" },
        { name: "Jon Casey", category: "Supporting Artists", day: "", spotifyId: "5dxriUBrAC2EuYYMG18z9B", youtubeId: "UCxQ9lMvg9kTBXx_lFKfxh4g" },
        { name: "Kanine", category: "Supporting Artists", day: "", spotifyId: "7EbHm1DzIRDyDWCxdEFbsH", youtubeId: "UC3cNDxMgJAe8P0jWMRVoqtA" },
        { name: "Loods", category: "Supporting Artists", day: "", spotifyId: "3q1uf4g2h4X3UfcEBc9IUs", youtubeId: "UC8UdkvXDDvLJNlIxvERz-tw" },
        { name: "Loofy", category: "Supporting Artists", day: "", spotifyId: "3DRSAC2WRhkOxDQ26RJgeh", youtubeId: "UCL8eWzUY3uwJnUxQxhAs9lQ" },
        { name: "Love.Shaun", category: "Supporting Artists", day: "", spotifyId: "7hGmQLrT6NdTCKyvCncGQw", youtubeId: "UCcBLJUfAR0di3DtbjIhHlaw" },
        { name: "Lowdown Brass Band", category: "Supporting Artists", day: "", spotifyId: "1FaS3GPKCbO2Zkfmy7Y5ot", youtubeId: "UCBP_PZ3CjivvkS__Vo1IfYA" },
        { name: "Main Phase", category: "Supporting Artists", day: "", spotifyId: "4qHzj0xxGY6SFdnEMmNKPr", youtubeId: "UCdj1Y0T5KjtVBYOJc1Tmg-w" },
        { name: "Maz", category: "Supporting Artists", day: "", spotifyId: "4dDi8GNr8WvN2Lf2XkKvIV", youtubeId: "UCzOEzF8nrZELHxGnktLGEcA" },
        { name: "Midnight Generation", category: "Supporting Artists", day: "", spotifyId: "4nQGm7tBlKwYnN6m3F7w0e", youtubeId: "UCP7jYMfuGN7dq5v7xZ-ICGA" },
        { name: "Moody Good", category: "Supporting Artists", day: "", spotifyId: "0Dd8LahWwHDkUfWDPXQphq", youtubeId: "UCIlQjHCUCwz5KiOJjZOUHxw" },
        { name: "Naclo", category: "Supporting Artists", day: "", spotifyId: "3ENnx1KV0CfIGllUJZ0XCr", youtubeId: "UCgm7DP0JbpV8aRXVR8zSmtg" },
        { name: "Mimmo", category: "Supporting Artists", day: "", spotifyId: "5aG9uCuuMdvyQJ1MHPDz6M", youtubeId: "UCjEL6ACfgdQ3QsL-5EbQzQw" },
        { name: "Otta", category: "Supporting Artists", day: "", spotifyId: "59TlRXYDQNEWzHr3yqsB9M", youtubeId: "UC7ymzB-BMnZQg4CtvKHWHOQ" },
        { name: "Pocket", category: "Supporting Artists", day: "", spotifyId: "0o26FLEXKRKyzd0YJDIcwE", youtubeId: "UC-hDVVQGxA2a9aKXN_YlJ3Q" },
        { name: "Pretty Pink", category: "Supporting Artists", day: "", spotifyId: "4k5K7cPhVGxwm5lYPzGRpw", youtubeId: "UCa0bYkWW5OlyhDrSdZSlufQ" },
        { name: "Riordan", category: "Supporting Artists", day: "", spotifyId: "2YZZFNnza3X2vQUUPRzc9h", youtubeId: "UCnlQX-62RHoZcxXqjlOZhpQ" },
        { name: "Roi Turbo", category: "Supporting Artists", day: "", spotifyId: "6SQ8LvBrwvLvYGv7gWwF8e", youtubeId: "UCxZmQtaLZlPbEduZ61U9CiA" },
        { name: "Sasquatch", category: "Supporting Artists", day: "", spotifyId: "2Tz1DTzf4WNDp3RK5T5U3c", youtubeId: "UCCYgNx_5Gu3y3kVXDxULKjw" },
        { name: "Say She She", category: "Supporting Artists", day: "", spotifyId: "6w33Yu90d8mcYPXzYLfweO", youtubeId: "UCfHkBQpL3ULNnkCNfJjqcfA" },
        { name: "Shima", category: "Supporting Artists", day: "", spotifyId: "6vnfObZ4d2Y6LjKtkPUlI6", youtubeId: "UCpfTUG_sbLCyKZZBFQvQSUw" },
        { name: "Sota", category: "Supporting Artists", day: "", spotifyId: "0dY0oCP3wJmRhtA6A58Iyd", youtubeId: "UC8Gx4M6i2CG-G-zmwZhPJHw" },
        { name: "Spoone", category: "Supporting Artists", day: "", spotifyId: "0L4Rg1vvA8iyro4FjcGjMo", youtubeId: "UCkSvq7wX6SZKjOzN1wZsxyw" },
        { name: "Taahliah", category: "Supporting Artists", day: "", spotifyId: "1Uiq2YF1HBVNvEFKHDTHNa", youtubeId: "UCcLe19AhvbQK_jEHofOd9jg" },
        { name: "Taiki Nulight", category: "Supporting Artists", day: "", spotifyId: "1FWLR6mBYSw8XPYE8j2vjV", youtubeId: "UCZSxb1-_MrUFn9Ttf_hJG1g" },
        { name: "The Free Label", category: "Supporting Artists", day: "", spotifyId: "56Ac9M98Os3EjpPHwuMMpD", youtubeId: "UCg6SYcJrlfR-XRMVoYLOCpw" },
        { name: "The Philharmonik", category: "Supporting Artists", day: "", spotifyId: "0qwJzWLhgcPVWetKHnZg8Q", youtubeId: "UCHl2Jsn0jyUHRNcvQlc9OOw" },
        { name: "The Strike", category: "Supporting Artists", day: "", spotifyId: "4iIrC8VhU5M0V6U4g8aEYN", youtubeId: "UCaY0-BwzGA8GjuQqQDjuJUw" },
        { name: "Villager", category: "Supporting Artists", day: "", spotifyId: "5qPeAT4iklOpV94GCaa9X0", youtubeId: "UCCJeNS8S8WJRksAT5z5IqCw" },
        { name: "Wakyn", category: "Supporting Artists", day: "", spotifyId: "5aYaJO4Jx4GIzCiZ1TxMlk", youtubeId: "UCDu6WLLToi3KIoUMVJJMG6w" },
        { name: "Wonkywilla", category: "Supporting Artists", day: "", spotifyId: "49Xj97cDAEQqVvuLGBhf9C", youtubeId: "UCf9XxpYFxdE5EcnIpQs5iZA" },
        { name: "Wreckno", category: "Supporting Artists", day: "", spotifyId: "2wK3jvvBEUFcCGGI66qsmU", youtubeId: "UCVoYQR3wGrOt2k2MbCZUVJA" },
        { name: "YDG", category: "Supporting Artists", day: "", spotifyId: "2yJ9ZQWh1HorvpQV4SSnGx", youtubeId: "UCM83fmFZ-HYsm8VoCdpfJHQ" }
    ];

    // State for filtering and sorting
    const [filter, setFilter] = useState("");
    const [category, setCategory] = useState("All");
    const [day, setDay] = useState("All");
    const [sortBy, setSortBy] = useState("category");
    const [sortDirection, setSortDirection] = useState("asc");

    // State for playlist creation
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [playlistName, setPlaylistName] = useState("Electric Forest 2025 Mix");
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

    // Filter artists based on current filters
    const filteredArtists = allArtists.filter(artist => {
        const nameMatch = artist.name.toLowerCase().includes(filter.toLowerCase());
        const categoryMatch = category === "All" || artist.category === category;
        const dayMatch = day === "All" || artist.day === day;
        return nameMatch && categoryMatch && dayMatch;
    });

    // Sort artists based on current sort settings
    const sortedArtists = [...filteredArtists].sort((a, b) => {
        let comparison = 0;
        if (sortBy === "name") {
            comparison = a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            // Sort by category first, then by name
            comparison = a.category.localeCompare(b.category);
            if (comparison === 0) {
                comparison = a.name.localeCompare(b.name);
            }
        } else if (sortBy === "day") {
            const days = ["Thursday", "Friday", "Saturday", "Sunday", "Special", ""];
            comparison = days.indexOf(a.day) - days.indexOf(b.day);
            if (comparison === 0) {
                comparison = a.name.localeCompare(b.name);
            }
        }
        return sortDirection === "asc" ? comparison : -comparison;
    });

    // Handle sort toggle
    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDirection("asc");
        }
    };

    // Get unique days for filtering
    const days = ["All", ...Array.from(new Set(allArtists.map(artist => artist.day).filter(day => day !== "")))];

    // Function to copy filtered artists to clipboard
    const copyToClipboard = () => {
        // Get selected artists or use filtered list if none selected
        const artistsToCopy = Object.keys(selectedArtists).length > 0
            ? sortedArtists.filter(artist => selectedArtists[artist.name])
            : sortedArtists;

        // Format the text based on column preferences
        const textToCopy = artistsToCopy.map(artist => {
            let parts = [];
            if (columnPreferences.name) parts.push(artist.name);
            if (columnPreferences.category) parts.push(artist.category);
            if (columnPreferences.day && artist.day) parts.push(artist.day);
            return parts.join(' - ');
        }).join('\n');

        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();

        try {
            // Execute copy command
            document.execCommand('copy');
            alert(`${artistsToCopy.length} artists copied to clipboard!`);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy to clipboard. Please try again.');
        }

        // Clean up
        document.body.removeChild(textarea);
    };

    // Function to create a text file for download
    const downloadAsCsv = () => {
        // Get selected artists or use filtered list if none selected
        const artistsToDownload = Object.keys(selectedArtists).length > 0
            ? sortedArtists.filter(artist => selectedArtists[artist.name])
            : sortedArtists;

        // Create headers based on column preferences
        let headers = [];
        if (columnPreferences.name) headers.push("Artist Name");
        if (columnPreferences.category) headers.push("Category");
        if (columnPreferences.day) headers.push("Day");

        // Add music service ID columns
        if (musicService === "spotify") headers.push("Spotify ID");
        if (musicService === "youtube") headers.push("YouTube ID");

        let csvContent = headers.join(',') + "\n";

        // Add data rows
        csvContent += artistsToDownload.map(artist => {
            let parts = [];
            if (columnPreferences.name) parts.push(`"${artist.name}"`);
            if (columnPreferences.category) parts.push(`"${artist.category}"`);
            if (columnPreferences.day) parts.push(`"${artist.day}"`);

            // Add music service IDs
            if (musicService === "spotify") parts.push(`"${artist.spotifyId || ''}"`);
            if (musicService === "youtube") parts.push(`"${artist.youtubeId || ''}"`);

            return parts.join(',');
        }).join('\n');

        // Create a Blob with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'electric_forest_2025_lineup.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Toggle selection of an artist
    const toggleArtistSelection = (artistName: string) => {
        setSelectedArtists(prev => ({
            ...prev,
            [artistName]: !prev[artistName]
        }));
    };

    // Select/deselect all visible artists
    const toggleAllArtists = () => {
        const someSelected = sortedArtists.some(artist => selectedArtists[artist.name]);

        if (someSelected) {
            // If any selected, clear all selections
            setSelectedArtists({});
        } else {
            // Select all currently filtered artists
            const newSelected: Record<string, boolean> = {};
            sortedArtists.forEach(artist => {
                newSelected[artist.name] = true;
            });
            setSelectedArtists(newSelected);
        }
    };

    // Toggle column preference
    const toggleColumnPreference = (column: keyof ColumnPreferences) => {
        setColumnPreferences(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
    };

    // Count selected artists
    const selectedCount = Object.values(selectedArtists).filter(Boolean).length;

    // Function to open selected artists in Spotify or YouTube
    const openSelectedArtists = () => {
        const selectedArtistsList = sortedArtists.filter(artist => selectedArtists[artist.name]);

        if (selectedArtistsList.length === 0) {
            alert("Please select at least one artist.");
            return;
        }

        // Limit to max 10 windows to avoid browser blocking
        const maxToOpen = 8;
        let openCount = 0;

        if (selectedArtistsList.length > maxToOpen) {
            if (!confirm(`You're about to open ${selectedArtistsList.length} tabs. This may be blocked by your browser. Continue with the first ${maxToOpen}?`)) {
                return;
            }
        }

        selectedArtistsList.forEach(artist => {
            if (openCount >= maxToOpen) return;

            const id = musicService === "spotify" ? artist.spotifyId : artist.youtubeId;
            if (!id) {
                console.log(`No ${musicService} ID for ${artist.name}`);
                return;
            }

            const url = musicService === "spotify"
                ? `https://open.spotify.com/artist/${id}`
                : `https://www.youtube.com/channel/${id}`;

            window.open(url, '_blank');
            openCount++;
        });

        // Update UI if we stopped early
        if (selectedArtistsList.length > maxToOpen) {
            alert(`Opened ${maxToOpen} of ${selectedArtistsList.length} selected artists. Browsers limit how many tabs can be opened at once.`);
        }
    };

    // Function to create a playlist (simulation)
    const createPlaylist = () => {
        const selectedArtistsList = sortedArtists.filter(artist => selectedArtists[artist.name]);

        if (selectedArtistsList.length === 0) {
            alert("Please select at least one artist for your playlist.");
            return;
        }

        setIsCreatingPlaylist(true);

        // This would normally connect to the Spotify/YouTube API
        // For now, we'll simulate the process
        setTimeout(() => {
            setIsCreatingPlaylist(false);
            setShowPlaylistModal(false);

            const service = musicService === "spotify" ? "Spotify" : "YouTube Music";
            alert(`Your "${playlistName}" would now be created on ${service} with tracks from ${selectedArtistsList.length} artists!\n\nNote: This is a simulation. To create actual playlists, this app would need to connect to the ${service} API with proper authentication.`);
        }, 2000);
    };

    // Effect to update the hidden textarea content for copying
    useEffect(() => {
        if (copyRef.current) {
            const artistsToShow = Object.keys(selectedArtists).length > 0
                ? sortedArtists.filter(artist => selectedArtists[artist.name])
                : sortedArtists;

            (copyRef.current as HTMLTextAreaElement).value = artistsToShow.map(artist => {
                let parts = [];
                if (columnPreferences.name) parts.push(artist.name);
                if (columnPreferences.category) parts.push(artist.category);
                if (columnPreferences.day && artist.day) parts.push(artist.day);
                return parts.join(' - ');
            }).join('\n');
        }
    }, [selectedArtists, sortedArtists, columnPreferences]);

    return (
        <div className="p-3 sm:p-4 md:p-6 w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl mx-auto rounded-lg my-4 md:my-8" style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10,30,15,0.9), rgba(5,15,20,0.92)), url('/src/assets/electricForestLineup.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "0 0 20px rgba(0, 255, 170, 0.5), 0 0 40px rgba(128, 0, 255, 0.3), inset 0 0 30px rgba(0, 255, 128, 0.05)",
            border: "1px solid rgba(128, 255, 212, 0.5)",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Electric glow border effect */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "linear-gradient(45deg, transparent 98%, rgba(0, 255, 170, 0.8) 100%), linear-gradient(135deg, transparent 98%, rgba(128, 0, 255, 0.8) 100%)",
                opacity: "0.5",
                animation: "pulse 3s infinite ease-in-out"
            }}></div>
            <div className="mb-8">
                <LineupHeader />

                <FilterPanel 
                    filter={filter} 
                    setFilter={setFilter}
                    category={category}
                    setCategory={setCategory}
                    day={day}
                    setDay={setDay}
                    days={days}
                    musicService={musicService}
                    setMusicService={setMusicService}
                />
            </div>

            <ArtistTable 
                sortedArtists={sortedArtists}
                selectedArtists={selectedArtists}
                toggleArtistSelection={toggleArtistSelection}
                toggleAllArtists={toggleAllArtists}
                handleSort={handleSort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                musicService={musicService}
            />

            <div className="mt-8">
                <LineupStats 
                    sortedArtists={sortedArtists}
                    allArtists={allArtists}
                    selectedCount={selectedCount}
                />

                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"
                        style={{textShadow: "0 0 5px rgba(0, 255, 170, 0.5)"}}>
                        Export Your Custom Lineup
                    </h3>

                    <ColumnSelector 
                        columnPreferences={columnPreferences}
                        toggleColumnPreference={toggleColumnPreference}
                    />

                    <ActionButtons 
                        selectedCount={selectedCount}
                        copyToClipboard={copyToClipboard}
                        downloadAsCsv={downloadAsCsv}
                        openSelectedArtists={openSelectedArtists}
                        setShowPlaylistModal={setShowPlaylistModal}
                        musicService={musicService}
                    />
                </div>

                <TextExport 
                    copyRef={copyRef}
                    selectedArtists={selectedArtists}
                    sortedArtists={sortedArtists}
                    columnPreferences={columnPreferences}
                />

                {showPlaylistModal && (
                    <PlaylistModal 
                        isCreatingPlaylist={isCreatingPlaylist}
                        setShowPlaylistModal={setShowPlaylistModal}
                        playlistName={playlistName}
                        setPlaylistName={setPlaylistName}
                        selectedCount={selectedCount}
                        createPlaylist={createPlaylist}
                        musicService={musicService}
                    />
                )}

                <style jsx>{`
                  @keyframes shimmer {
                    0% {
                      transform: translateY(-100%) translateX(-100%) rotate(-45deg);
                    }
                    50% {
                      transform: translateY(100%) translateX(100%) rotate(-45deg);
                    }
                    100% {
                      transform: translateY(100%) translateX(100%) rotate(-45deg);
                    }
                  }
                `}</style>
            </div>
        </div>
    );
};

export default ElectricForestLineup;