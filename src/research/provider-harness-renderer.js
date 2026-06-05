/* Extracted from src/research-engine.js for v1.4.0-alpha.45. */
(function(global){
  'use strict';

  function renderProviderHarness(ctx){
    const { $, state, providerContractPreview, providerPromptPreview, providerDiagnostics, portableAccountStatus, uxReliability, tr, esc, localizedBoolean, lStatus, providerRouteReport, providerCostReport, portableOAuthSpikeStatus, emptyState, validationSummary } = ctx;
    const contractEl = $('providerContractPreview');
    const promptEl = $('providerPromptPreview');
    const diagEl = $('providerDiagnosticsOutput');
    const runEl = $('providerRunOutput');
    const currentTask = $('providerTask')?.value || state.activeProviderTask || 'synthesis';
    const contract = state.last_provider_contract_preview || providerContractPreview(currentTask);
    const promptPreview = state.last_provider_prompt_preview || (state.last_provider_payload ? providerPromptPreview(state.last_provider_payload) : null);
    const diagnostics = state.provider_diagnostics || (state.last_provider_payload ? providerDiagnostics(state.last_provider_payload) : null);
    const fixtureReport = state.provider_fixture_report;
    const portable = portableAccountStatus();
    const guideEl = $('providerModeGuide');
    if(guideEl){
      guideEl.innerHTML = uxReliability?.providerModeGuideHtml ? uxReliability.providerModeGuideHtml(state.provider || $('providerName')?.value || 'mock', tr, esc) : '';
    }
    if(contractEl){
      contractEl.innerHTML = `<strong>${esc(tr('providerContractLabel'))}</strong><span>${esc(contract.title || contract.type)} · ${esc(contract.type)}</span><small>${esc((contract.required || []).length)} ${esc(tr('required'))} · ${(contract.required || []).slice(0,5).map(esc).join(', ')}</small>`;
    }
    if(promptEl){
      if(promptPreview){
        promptEl.innerHTML = `<strong>${esc(tr('providerPromptLabel'))}</strong><span>${esc(promptPreview.task)} · ${esc(promptPreview.prompt_chars)} ${esc(tr('chars'))} · ${esc(promptPreview.prompt_fingerprint)}</span><small>${esc(promptPreview.privacy_mode)}${promptPreview.truncated ? ' · ' + tr('truncatedPreview') : ''}</small>`;
      } else {
        promptEl.innerHTML = `<strong>${esc(tr('providerPromptLabel'))}</strong><span>${esc(tr('providerPromptMissing'))}</span><small>${esc(tr('providerPromptMissingHint'))}</small>`;
      }
    }
    if(diagEl){
      const diagHtml = diagnostics ? `<div class="researchJsonCard providerDiagnosticsCard"><h4>${esc(tr('providerDiagnosticsTitle'))}</h4><div class="miniChips"><span>${esc(diagnostics.readiness)}</span><span>${esc(diagnostics.contract_type)}</span><span>${esc(diagnostics.prompt_chars)} ${esc(tr('chars'))}</span><span>${esc(tr('keyExported'))}:${esc(localizedBoolean(diagnostics.key_exported))}</span><span>key_exported:${diagnostics.key_exported ? 'true' : 'false'}</span><span>${esc(tr('auth'))}:${esc(diagnostics.auth_type || tr('unknown'))}</span><span>${esc(tr('billing'))}:${esc(diagnostics.billing_owner || tr('unknown'))}</span></div><ul>${(diagnostics.warnings || [tr('noSourceWarnings')]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
      const fixtureHtml = fixtureReport ? `<div class="researchJsonCard fixtureSuiteCard"><h4>${esc(tr('fixtureSuiteTitle'))}</h4><div class="miniChips"><span>${esc(fixtureReport.pass_count)}/${esc(fixtureReport.fixture_count)} ${esc(tr('passed'))}</span><span>${esc(tr('fails'))}:${esc(fixtureReport.fail_count)}</span></div><ul>${(fixtureReport.results || []).map(item=>`<li><strong>${esc(item.fixture_id)}</strong>: ${esc(item.pass ? lStatus('pass') : 'fail')} · ${esc(tr('accepted'))}:${esc(localizedBoolean(item.accepted))} · ${esc(tr('issues'))}:${esc(item.issue_count)}</li>`).join('')}</ul></div>` : '';
      const routeReport = providerRouteReport();
      const costReport = providerCostReport();
      const routeHtml = routeReport ? `<div class="researchJsonCard providerRouteCard"><h4>${esc(tr('providerRouterTitle'))}</h4><div class="miniChips"><span>${esc(routeReport.selected_provider || 'mock')}</span><span>${esc(tr('suitability'))}:${esc(routeReport.average_suitability_score || 0)}/100</span><span>${esc(tr('cost'))}:$${esc(costReport?.selected_estimated_cost_usd ?? 0)}</span><span>${esc(tr('dryRun'))}:${esc(localizedBoolean(routeReport.dry_run_only))}</span></div><small>${esc(lStatus(routeReport.release_gate || 'provider_route_review_required'))}</small></div>` : '';
      const portableSpike = portableOAuthSpikeStatus();
      const portableHtml = `<div class="researchJsonCard portableAccountCard"><h4>${esc(tr('portableTitle'))}</h4><div class="miniChips"><span>${esc(portable.status)}</span><span>${esc(tr('token'))}:${esc(localizedBoolean(portable.token_present))}</span><span>${esc(tr('mock'))}:${esc(localizedBoolean(portable.mock_only))}</span><span>${esc(tr('oauth'))}:${esc(lStatus(portableSpike?.status || 'none'))}</span><span>${esc(tr('keyExported'))}:${esc(localizedBoolean(portable.key_exported))}</span></div><small>${esc(portable.safety_verdict)}${portable.account_id ? ' · ' + esc(portable.account_id) : ''}</small></div>`;
      diagEl.innerHTML = diagHtml + routeHtml + portableHtml + fixtureHtml;
    }
    if(!runEl) return;
    const runs = state.ai_runs || [];
    if(!runs.length){ runEl.innerHTML = emptyState(tr('runLedgerEmpty'), tr('providerRunEmptyHint'), tr('dryRunProviderRequest')); return; }
    runEl.innerHTML = `<div class="researchTableWrap"><table class="researchTable providerTable"><thead><tr><th>${esc(tr('run'))}</th><th>${esc(tr('providerTask'))}</th><th>${esc(tr('providerName'))}</th><th>${esc(tr('status'))}</th><th>${esc(tr('validation'))}</th><th>${esc(tr('output'))}</th></tr></thead><tbody>${runs.slice().reverse().map(run=>`<tr><td>${esc(run.run_id)}</td><td>${esc(run.task)}</td><td>${esc(run.provider)}</td><td>${esc(run.status)} · ${esc(run.duration_ms)}ms</td><td>${esc(validationSummary(run.response_validation, run.repair_trace))}</td><td>${esc(run.output_summary)}<small>${esc((run.warnings || []).join(' · '))}</small></td></tr>`).join('')}</tbody></table></div>`;
  }

  global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  global.Jarbou3iResearchModules.providerHarnessRenderer = Object.freeze({
    renderProviderHarness
  });
})(typeof window !== 'undefined' ? window : globalThis);
