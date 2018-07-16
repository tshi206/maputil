<?php
/**
 * Created by PhpStorm.
 * User: mason
 * Date: 7/12/18
 * Time: 2:17 PM
 */

// put library here
// example:
// script('maputil', 'handlebars-v4.0.11');

// jQuery is included by default on every page.

style('maputil', 'style');

?>

    <div id="app">

        <div id="app-content">

            <div id="app-content-wrapper">
				<?php print_unescaped($this->inc('part.content'))?>

            </div>

        </div>

    </div>

<!--	<div id="app">-->
<!---->
<!--		<div id="app-content">-->
<!---->
<!--			<div id="app-content-wrapper">-->
<!--				--><?php //print_unescaped($this->inc('mason.test')); ?>
<!---->
<!--				<div style="text-align: center;">-->
<!--					<h1>-->
<!--						<button id="update_second_standalone" data-pk="1">Update the second recording with is_standalone state</button>-->
<!--						<button id="update_second_representative" data-pk="1">Update the second recording with is_representative state</button>-->
<!--					</h1>-->
<!---->
<!--					<div style="display: inline-block;">-->
<!--						<ul id="existing_cities"></ul>-->
<!--					</div>-->
<!---->
<!--					<div style="display: inline-block;">-->
<!--						<ul id="existing_suburbs_by_auckland"></ul>-->
<!--					</div>-->
<!---->
<!--					<div style="display: inline-block;">-->
<!--						<ul id="existing_recordings_by_auckland_auckland_central"></ul>-->
<!--					</div>-->
<!---->
<!--					<div id="placeholder">-->
<!---->
<!--					</div>-->
<!---->
<!--				</div>-->
<!---->
<!--			</div>-->
<!---->
<!--		</div>-->
<!---->
<!--	</div>-->

<?php
// place custom js logic at the end
//script('maputil', 'script');
script('maputil','maputil');
?>