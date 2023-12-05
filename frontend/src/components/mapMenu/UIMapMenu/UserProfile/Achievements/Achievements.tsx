import React from 'react';
import Achievement from "./Achievement.tsx";
import {IAchievementType} from "../../../../../types/AchievementType.ts";

interface IAchievementsProps {
    achievements: IAchievementType[];
}

const Achievements: React.FC<IAchievementsProps> = ({achievements}) => {
    return (
        <div className="achievements">
            <p className="achievements-title">ДОСТИЖЕНИЯ</p>
            <ul className="achievements-list">
                {achievements.map((achievement) =>
                    <Achievement
                        name={achievement.title}
                        key={achievement.id}
                        description={achievement.description}
                    />
                )}
            </ul>
        </div>
    );
};

export default Achievements;
