import { useState } from 'react';
import Ask from './ask'
import Style from './survey.module.scss'

type Props = {
    askings: {
        options: string[];
        response?: string;
    }[];
};

export type Profile = {
    dominant: any;
    influence: any;
    steadiness: any;
    compliance: any;
}

const Survey = ({ askings }: Props) => {
    const [profile, setProfile] = useState<Profile>({
        dominant: { profile: "dominant", scoreMore: 0, scoreLess: 0 },
        influence: { profile: "influence", scoreMore: 0, scoreLess: 0 },
        steadiness: { profile: "steadiness", scoreMore: 0, scoreLess: 0 },
        compliance: { profile: "compliance", scoreMore: 0, scoreLess: 0 },
    });

    const profileResult = () => {
        const profiles = [profile.dominant, profile.influence, profile.steadiness, profile.compliance]
        let profileAux: any = {profile: "", scoreMore: 0, scoreLess: 0};
        profiles.forEach((profile: any) => {
            if (profile.scoreMore > profileAux.scoreMore) {
                profileAux = profile;
            }
        })
        return profileAux;
    }

    const handleProfile = (profile: Profile) => {
        setProfile(profile);
    }

    return (
        <div>
            <form className={Style.form}>
                {askings.map((ask) => {
                    return (
                        <Ask utterance={ask.options} profile={profile} onChangeProfile={handleProfile}/>
                    )
                })}
            </form>
            <div id="scores" className={Style.scores}>
                <div id="scoreMore" className={Style.scoreTable}>
                    <div className={Style.profileNames}>
                        <div><p>Dominante:</p></div>
                        <div><p>Conformidade:</p></div>
                        <div><p>Influente:</p></div>
                        <div><p>Estabilidade:</p></div>
                    </div>
                    <div className={Style.scoresValue}>
                        <div><p>{profile.dominant.scoreMore}</p></div>
                        <div><p>{profile.compliance.scoreMore}</p></div>
                        <div><p>{profile.influence.scoreMore}</p></div>
                        <div><p>{profile.steadiness.scoreMore}</p></div>
                    </div>
                </div>
                <div id="scoreLess" className={Style.scoreTable}>
                    <div className={Style.profileNames}>
                        <div><p>Dominante:</p></div>
                        <div><p>Conformidade:</p></div>
                        <div><p>Influente:</p></div>
                        <div><p>Estabilidade:</p></div>
                    </div>
                    <div className={Style.scoresValue}>
                        <div><p>{profile.dominant.scoreLess}</p></div>
                        <div><p>{profile.compliance.scoreLess}</p></div>
                        <div><p>{profile.influence.scoreLess}</p></div>
                        <div><p>{profile.steadiness.scoreLess}</p></div>
                    </div>
                </div> 
                <div data-profile={profileResult().profile} className={Style.profile}>
                    <div className={Style.profileTitle}>
                        <h2>{profileResult().profile.substring(0,1)}</h2>
                    </div>
                    <div className={Style.profileDetails}>
                        <h4>{profileResult().profile}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Survey;