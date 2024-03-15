import React, { Component } from "react";
import map from '../map.png';

export default class Guidelines extends Component{
    render() {
        return(
            <div style={{textAlign:'left', padding:'30px'}}>
                <img src={map} alt='Map of Ukraine and Surroundings' style={{textAlign:'center', padding:'40px'}}></img>
                <h2 style={{textAlign:'center'}}>Guidelines</h2>
                <p>
                    The objective of this annotation project is to analyze Telegram messages to identify military combat
                    engagements in the specified region. The annotations will indicate whether a message
                    refers to a combat engagement based on the defined criteria below. <br></br><br></br>

                    <b>Yes:</b> If the message refers to a combat engagement (as per the defined criteria).<br></br><br></br>
                    <b>No:</b> If the message does not meet the criteria for a combat engagement.<br></br><br></br>
                    <b>Unsure:</b> If you are not sure whether the message meets the criteria or not.<br></br><br></br>
                </p>

                <br></br>
                
                <h3>Combat Engagements</h3>
                
                <p>Annotate messages that explicitly report military activities or combat engagements.<br></br>
                Exclude messages related to training or exercises unless they explicitly mention real-world combat
                scenarios.<br></br>
                
                <h4>Examples</h4>
                
                <b>Yes:</b> <i>"right now, racists are storming soledar at the moment, the enemy has engaged a large
                number of assault groups formed from the best reserves of the wagnerians."</i> <br></br><br></br>
                <b>No:</b> <i>"our military are currently training in the region, there is no reason to worry.”</i>
                </p>
                <br></br>
                <h3>Statistical Information</h3>
                
                <p>Include messages with statistical information if they are associated with a specific place and/or time
                and contribute to the understanding of a combat engagement. <br></br><br></br>
                Exclude standalone statistics or general military-related information without a specific context.<br></br>
                
                <h4>Examples</h4>
               
                <b>Yes:</b><i>"police received over 140 reports of enemy drones flying over kyiv region on new year's eve
                in 3 districts of the region, the wreckage of shahids has already been found. police continue to
                search for the remains of drones and record war crimes. in total, 32 drones were successfully
                destroyed by the air defense forces over kyiv and the capital last night. ."</i>
                <br></br><br></br>
                <b>No:</b><i>"ukrainian armed forces destroyed another 420 occupants and 33 enemy drones total enemy
                combat losses from 24.02 to 13.10 are estimated: personnel - 63,800 (+420) tanks - 2 511 (+6)
                armored combat vehicles - 5 167 (+11) artillery systems - 1 556 (+17) mlrs - 357 (+2) air defense
                systems - 183 aircraft - 268 helicopters - 240 (+6) uavs of operational and tactical level - 1 182
                (+33) cruise missiles - 316 ships / boats - 16 automotive vehicles and tanks - 3,935 (+9) special
                equipment - 140 the enemy suffered the greatest losses at the kramatorsk and kryvyi rih
                directions.”</i>
                </p>
                <br></br>
                <h3>Translation Errors and Slang</h3>
                <p>
                Annotate messages containing translation errors that may lead to confusion or misinterpretation.<br></br><br></br>
                Include messages with slang terms commonly used in reporting combat engagements (e.g., 'arrival,'
                'cotton,' etc.).

                <h4>Examples</h4>
                <b>Yes:</b><i>"russian occupation troops shelled nikopol district with grad and heavy artillery. more than
                30 enemy shells arrived there."</i>
                </p>

                <br></br>

                <h3>Troop Movement</h3>
                <p>
                Include messages reporting troop movements as long as they are associated with military
                engagements.<br></br><br></br>
                Exclude messages that only mention troop movements without a clear connection to combat
                situations.
                <h4>Examples</h4>
                <b>Yes:</b><i>"the russians have begun withdrawing troops from their positions in the central part of the
                zaporizhia region."</i><br></br><br></br>
                <b>No:</b><i>"in volyn and polissia, the belarusians are engaged in military operations, deploying their
                additional units to the border town of gomel.”</i>
                </p>

                <br></br>

                <h3>Non-Combat Emergencies</h3>
                <p>
                Exclude messages reporting non-combat emergencies, such as natural disasters, accidents, or other
                crisis situations unrelated to military activities.
                <h4>Examples</h4>
                <b>No:</b><i>"trams are temporarily running on a rerouted route due to the fall of a tree on the contact
                network on the section of sakharov street - gorbachevsky street.”</i>
                </p>

                <br></br>

                <h3>Geographical Focus</h3>
                <p>
                Limit annotations to messages related to military activities in Ukraine or bordering states.<br></br>
                <h4>Examples</h4>
                <b>No:</b><i>"israeli media showed the moment the palestinian tower exploded from the inside.”</i>
                </p>

                <br></br>

                <h3>Uncertain Cases</h3>
                <p>
                In cases of uncertainty, annotate conservatively. If there is insufficient information to determine
whether a message refers to a combat engagement, mark it as uncertain by clicking ‘Unsure’.
                <h4>Examples:</h4>
                <b>Unsure:</b><i>"Odesa, local publics report two explosions in the city center. no air alert has been
                declared. we are waiting for official information.”</i>
                </p>
            </div>
            
        )
    }
}